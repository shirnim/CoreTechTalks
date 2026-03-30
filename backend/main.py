import os
import sys
import asyncio

if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

import uuid
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import pydantic
import stripe
import resend

from database import engine, Base, get_db
from models import Tool, Order, DownloadToken
from dotenv import load_dotenv

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
resend.api_key = os.getenv("RESEND_API_KEY")

class CheckoutRequest(pydantic.BaseModel):
    tool_slug: str

@app.get("/api/tools")
def get_tools(db: Session = Depends(get_db)):
    tools = db.query(Tool).all()
    return tools

@app.get("/api/tools/{slug}")
def get_tool(slug: str, db: Session = Depends(get_db)):
    tool = db.query(Tool).filter(Tool.slug == slug).first()
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    return tool

@app.post("/api/create-checkout-session")
def create_checkout_session(request: CheckoutRequest, db: Session = Depends(get_db)):
    if not stripe.api_key:
        raise HTTPException(status_code=500, detail="Stripe not configured")
        
    tool = db.query(Tool).filter(Tool.slug == request.tool_slug).first()
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
        
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': tool.name,
                        'description': tool.description,
                    },
                    'unit_amount': int(tool.price * 100),
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f"{frontend_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{frontend_url}/payment/cancel",
            metadata={
                'tool_id': tool.id,
                'tool_slug': tool.slug
            }
        )
        return {"url": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def send_confirmation_email(email: str, tool_name: str, download_link: str):
    if not resend.api_key:
        print(f"Skipping email to {email} (Resend not configured)")
        return
        
    try:
        resend.Emails.send({
            "from": "Acme <onboarding@resend.dev>",
            "to": email,
            "subject": f"Your Purchase: {tool_name}",
            "html": f"<p>Thank you for purchasing <strong>{tool_name}</strong>!</p><p>You can download it for the next 10 minutes using this link:</p><p><a href='{download_link}'>{download_link}</a></p>"
        })
    except Exception as e:
        print(f"Email error: {e}")

@app.get("/api/verify-session")
def verify_session(session_id: str, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    if not stripe.api_key:
        raise HTTPException(status_code=500, detail="Stripe not configured")
        
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        
        if session.payment_status != "paid":
            raise HTTPException(status_code=400, detail="Payment not completed")
            
        tool_id = int(session.metadata['tool_id'])
        customer_email = session.customer_details.email if session.customer_details else "unknown@example.com"
        
        existing_order = db.query(Order).filter(Order.stripe_session_id == session_id).first()
        if existing_order:
            token = db.query(DownloadToken).filter(DownloadToken.order_id == existing_order.id, DownloadToken.used == False).first()
            if not token:
                token = DownloadToken(
                    token=str(uuid.uuid4()),
                    order_id=existing_order.id,
                    expires_at=datetime.now(timezone.utc) + timedelta(minutes=10)
                )
                db.add(token)
                db.commit()
            return {"token": token.token, "tool_name": db.query(Tool).filter(Tool.id == tool_id).first().name}
            
        order = Order(
            email=customer_email,
            tool_id=tool_id,
            stripe_session_id=session_id,
            status="paid"
        )
        db.add(order)
        db.commit()
        db.refresh(order)
        
        token_str = str(uuid.uuid4())
        token = DownloadToken(
            token=token_str,
            order_id=order.id,
            expires_at=datetime.now(timezone.utc) + timedelta(minutes=10)
        )
        db.add(token)
        db.commit()
        
        tool = db.query(Tool).filter(Tool.id == tool_id).first()
        api_url = f"http://localhost:8000/api/download?token={token_str}"
        
        background_tasks.add_task(send_confirmation_email, customer_email, tool.name, api_url)
        
        return {"token": token_str, "tool_name": tool.name}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/download")
def download_file(token: str, db: Session = Depends(get_db)):
    db_token = db.query(DownloadToken).filter(DownloadToken.token == token).first()
    
    if not db_token:
        raise HTTPException(status_code=404, detail="Invalid token")
        
    if db_token.used:
        raise HTTPException(status_code=400, detail="Token already used")
        
    if db_token.expires_at.replace(tzinfo=timezone.utc) < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Token expired")
        
    order = db.query(Order).filter(Order.id == db_token.order_id).first()
    tool = db.query(Tool).filter(Tool.id == order.tool_id).first()
    
    if not tool or not tool.file_path:
        raise HTTPException(status_code=404, detail="File not found")
        
    secure_dir = os.path.join(os.path.dirname(__file__), "secure_downloads")
    file_full_path = os.path.join(secure_dir, tool.file_path)
    
    if not os.path.exists(file_full_path):
        raise HTTPException(status_code=404, detail="Physical file missing on server")
        
    db_token.used = True
    db.commit()
    
    return FileResponse(path=file_full_path, filename=tool.file_path, media_type='application/octet-stream')

import pandas as pd
from typing import Optional
from io import BytesIO
from fastapi.responses import StreamingResponse

class JobSearchQuery(pydantic.BaseModel):
    term: Optional[str] = ""
    location: Optional[str] = ""
    experience: Optional[str] = ""
    page: Optional[int] = 1
    limit: Optional[int] = 10

class LiveScrapeQuery(pydantic.BaseModel):
    username: str
    password: str
    term: str
    location: str
    experience: str

class VerifyQuery(pydantic.BaseModel):
    username: str
    password: str

from mock_data import MOCK_JOBS
# Initialize with empty array so no dummy data is shown until search
ACTIVE_CACHE = {"jobs": []}

def _filter_jobs(query: JobSearchQuery):
    # Return all cached jobs without filtering — the scraper already searched by term+location
    return ACTIVE_CACHE["jobs"]

@app.post("/api/jobs/live-scrape")
def perform_live_scrape(query: LiveScrapeQuery):
    import asyncio
    import sys
    from scraper_service import execute_live_scrape
    
    def _runner():
        if sys.platform == 'win32':
            asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            return loop.run_until_complete(execute_live_scrape(
                query.username, 
                query.password, 
                query.term, 
                query.location, 
                query.experience
            ))
        finally:
            loop.close()

    # Execute actual asynchronous Playwright scrape via isolated thread loop!
    scraped_jobs = _runner()
    
    # Refresh cache for paginated table and recharts Dashboard
    if scraped_jobs:
        ACTIVE_CACHE["jobs"] = scraped_jobs
    else:
        raise HTTPException(status_code=400, detail="LinkedIn blocked the headless bot request (0 jobs found). Revert 'headless=False' to manually bypass.")
        
    return {"status": "success", "total_jobs_scraped": len(scraped_jobs)}

@app.post("/api/jobs/verify-linkedin")
def verify_linkedin(query: VerifyQuery):
    import traceback
    import asyncio
    import sys
    try:
        from scraper_service import verify_linkedin_credentials
        
        def _runner():
            if sys.platform == 'win32':
                asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            try:
                return loop.run_until_complete(verify_linkedin_credentials(query.username, query.password))
            finally:
                loop.close()
                
        success = _runner()
        if not success:
            raise HTTPException(status_code=401, detail="Invalid LinkedIn credentials or CAPTCHA timeout.")
        return {"status": "success"}
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        print(f"Exception during verification:\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

@app.post("/api/jobs/search")
def search_jobs(query: JobSearchQuery):
    filtered = _filter_jobs(query)
    total = len(filtered)
    start = (query.page - 1) * query.limit
    end = start + query.limit
    return {
        "page": query.page,
        "total_results": total,
        "results": filtered[start:end]
    }

@app.post("/api/jobs/export")
def export_jobs(query: JobSearchQuery):
    filtered = _filter_jobs(query)
    df = pd.DataFrame(filtered)
    output = BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Jobs')
    output.seek(0)
    
    headers = {
        'Content-Disposition': 'attachment; filename="jobs_export.xlsx"'
    }
    return StreamingResponse(output, headers=headers, media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

@app.post("/api/jobs/analyze")
def analyze_jobs(query: JobSearchQuery):
    filtered = _filter_jobs(query)
    if not filtered:
        return {"total_jobs": 0, "top_company": "-", "top_title": "-", "company_chart": [], "location_chart": []}
        
    df = pd.DataFrame(filtered)
    # Ensure columns exist and aren't completely empty before getting index[0] to avoid IndexError
    top_company = df['company'].value_counts().index[0] if len(df['company'].value_counts()) > 0 else "-"
    top_title = df['job_title'].value_counts().index[0] if len(df['job_title'].value_counts()) > 0 else "-"
    
    comp_counts = df['company'].value_counts().head(5).reset_index()
    comp_chart = [{"name": row['company'], "count": row['count']} for _, row in comp_counts.iterrows()]
    
    loc_counts = df['location'].value_counts().head(5).reset_index()
    loc_chart = [{"name": row['location'], "value": row['count']} for _, row in loc_counts.iterrows()]
    
    return {
        "total_jobs": len(filtered),
        "top_company": top_company,
        "top_title": top_title,
        "company_chart": comp_chart,
        "location_chart": loc_chart
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
