import os
from database import SessionLocal, engine, Base
from models import Tool

Base.metadata.create_all(bind=engine)

def seed():
    db = SessionLocal()
    
    tools = [
        {
            "slug": "jobs-analytics",
            "name": "MarketPulse Jobs Engine",
            "description": "An interactive, real-time dashboard to explore job postings, compute geospatial hiring trends, and export actionable market data instantly.",
            "features": "Interactive Dashboard, Real-time Search, Pandas Aggregations, Custom Excel Export",
            "price": 0.0,
            "file_path": ""
        }
    ]
    
    for t in tools:
        if not db.query(Tool).filter(Tool.slug == t["slug"]).first():
            new_tool = Tool(**t)
            db.add(new_tool)
            
    db.commit()
    print("Database seeded with sample tools.")
    
    secure_dir = os.path.join(os.path.dirname(__file__), "secure_downloads")
    os.makedirs(secure_dir, exist_ok=True)
    
    for t in tools:
        filepath = os.path.join(secure_dir, t["file_path"])
        if not os.path.exists(filepath):
            with open(filepath, "w") as f:
                f.write(f"# Mock source code archive for {t['name']}\nprint('Hello World')")
    
    print("Created mock secure files in secure_downloads/.")
    db.close()

if __name__ == "__main__":
    seed()
