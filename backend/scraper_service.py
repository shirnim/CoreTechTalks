import os
import re
import asyncio
from urllib.parse import quote_plus
from playwright.async_api import async_playwright

STATE_FILE = "linkedin_state.json"

COMMON_TOOLS = [
    "Python", "Java", "C++", "C#", "JavaScript", "TypeScript", "React", "Angular", "Vue",
    "Node.js", "Django", "Flask", "Spring", "AWS", "Azure", "GCP", "Google Cloud", 
    "Docker", "Kubernetes", "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", 
    "Kafka", "Spark", "Hadoop", "Tableau", "PowerBI", "Excel", "Git", "Jenkins", 
    "CI/CD", "Terraform", "Ansible", "Linux", "Unix", "Jira", "Confluence", "Agile",
    "Scrum", "Machine Learning", "NLP", "PyTorch", "TensorFlow", "Pandas", "NumPy", "Go", "Rust", "Swift", "Kotlin", "Ruby", "PHP"
]
COMMON_CERTS = [
    "AWS Certified", "PMP", "CISSP", "CISM", "CISA", "CEH", "CompTIA", "CCNA",
    "CCNP", "Azure Fundamentals", "Google Cloud Certified", "Scrum Master", "CSM"
]

def apply_nlp_extraction(raw_text: str) -> dict:
    """
    Heuristic-based NLP to quickly extract structured sections from a dense job description.
    """
    text = raw_text.replace('\u200b', '').strip()
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    
    responsibilities = []
    qualifications = []
    current_section = None
    
    # State-machine parser to detect section headers and extract subsequent bullets
    for line in lines:
        lower_line = line.lower()
        if any(keyword in lower_line for keyword in ["responsibilities", "what you'll do", "your role", "what you will do"]):
            if len(line) < 50:
                current_section = "responsibilities"
                continue
        elif any(keyword in lower_line for keyword in ["qualifications", "requirements", "what you need", "who you are", "skills"]):
            if len(line) < 50:
                current_section = "qualifications"
                continue
        elif len(line) < 50 and line.isupper():
            current_section = None # Random other uppercase header, stop collecting
            
        if current_section == "responsibilities":
            if line.startswith(('-', '*', '•', '·', 'o', '✓', '->', '=>')) or len(line) > 15:
                cleaned = re.sub(r'^[-\*•·o✓=><\s]*', '', line).strip()
                if cleaned: responsibilities.append(cleaned)
                if len(responsibilities) > 10: current_section = None
        elif current_section == "qualifications":
            if line.startswith(('-', '*', '•', '·', 'o', '✓', '->', '=>')) or len(line) > 15:
                cleaned = re.sub(r'^[-\*•·o✓=><\s]*', '', line).strip()
                if cleaned: qualifications.append(cleaned)
                if len(qualifications) > 10: current_section = None
                    
    # Keyword extraction (Named Entity Recognition via Dictionary)
    text_lower = text.lower()
    
    found_tools = []
    for tool in COMMON_TOOLS:
        lower_tool = tool.lower()
        # Word boundary regex for exact tool matching (prevents "React" matching inside "Reaction")
        if re.search(rf'\b{re.escape(lower_tool)}\b', text_lower):
            found_tools.append(tool)
            
    found_certs = []
    for cert in COMMON_CERTS:
        if cert.lower() in text_lower:
            found_certs.append(cert)
            
    return {
        "responsibilities": responsibilities[:5], # Return top 5 bullets
        "qualifications": qualifications[:5],
        "tools": ", ".join(found_tools) if found_tools else "Not specified",
        "certifications": ", ".join(found_certs) if found_certs else "None required",
    }

async def verify_linkedin_credentials(username, password):
    """
    Always performs a fresh LinkedIn login.
    Returns True if authenticated, False if credentials are wrong or timed out.
    """
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()

        try:
            await page.goto("https://www.linkedin.com/login", wait_until="domcontentloaded")
            await page.wait_for_selector("#username", state="visible", timeout=15000)
            
            # Instant fill is much faster, but we need a brief pause before submitting 
            # so LinkedIn's React frontend registers the text before the click.
            await page.fill("#username", username)
            await page.fill("#password", password)
            await asyncio.sleep(0.5)
            await page.click("button[type='submit']")

            elapsed = 0
            while elapsed < 90:
                # Proper visibility check for error elements (they might exist hidden in the DOM normally)
                pwd_error_visible = False
                user_error_visible = False
                try:
                    pwd_error_visible = await page.locator("#error-for-password").is_visible()
                    user_error_visible = await page.locator("#error-for-username").is_visible()
                except Exception:
                    pass

                if pwd_error_visible or user_error_visible:
                    print("[Auth Debug] Failed: LinkedIn visibly displayed an invalid credentials error msg.")
                    await page.screenshot(path="auth_error.png")
                    await browser.close()
                    return False
                
                if "login" not in page.url and "checkpoint" not in page.url:
                    break
                await asyncio.sleep(1)
                elapsed += 1

            if "login" not in page.url:
                await context.storage_state(path=STATE_FILE)
                print("[Auth] Login successful — session saved for scraping.")
                await browser.close()
                return True
            else:
                print(f"[Auth Debug] Failed: 90s timeout reached. Still stuck on URL: {page.url}")
                await page.screenshot(path="auth_error.png")
                await browser.close()
                return False

        except Exception as e:
            print(f"[Auth Debug] Verify Error Exception: {e}")
            await browser.close()
            return False


async def extract_job_details(context, target_url, sem, job_idx, total_jobs):
    async with sem:
        page = await context.new_page()
        job_data = {
            "id": job_idx,
            "job_title": "Not Found",
            "company": "Not Found",
            "location": "Not Found",
            "experience": "Not Found",
            "job_type": "Not Found",
            "posted_date": "Not Found",
            "job_link": target_url,
            "responsibilities": [],
            "qualifications": [],
            "tools": "Not specified",
            "certifications": "None required"
        }
        try:
            await page.goto(target_url, wait_until="domcontentloaded", timeout=45000)
            await asyncio.sleep(3)
            
            # Extract Main Description Text for NLP Pipeline
            # We use full page text because LinkedIn constantly changes description CSS classes
            try:
                raw_text = await page.evaluate("document.body.innerText")
                if raw_text and len(raw_text.strip()) > 50:
                    nlp_results = apply_nlp_extraction(raw_text)
                    job_data.update(nlp_results)
            except Exception as e:
                print(f"[NLP Extraction] Error parsing description on {target_url}: {e}")
            
            page_title = await page.title()
            try:
                if "|" in page_title:
                    parts = [p.strip() for p in page_title.split("|")]
                    if len(parts) >= 1: job_data["job_title"] = parts[0]
                    if len(parts) >= 2: job_data["company"] = parts[1]
            except Exception:
                pass
                
            try:
                p_elements = await page.locator("p").all_inner_texts()
            except Exception:
                p_elements = []
                
            for text in p_elements:
                if "·" in text and ("ago" in text or "applicant" in text or "hour" in text or "day" in text or "week" in text or "month" in text):
                    parts = [p.strip() for p in text.split("·")]
                    if len(parts) >= 1: job_data["location"] = parts[0]
                    if len(parts) >= 2: job_data["posted_date"] = parts[1]
                    break

            try:
                all_spans = await page.locator("span").all_inner_texts()
                for text in (p_elements + all_spans):
                    text_lower = text.lower()
                    if ("full-time" in text_lower or "part-time" in text_lower or "contract" in text_lower or "internship" in text_lower or "hybrid" in text_lower) and len(text) < 40 and "\n" not in text:
                        job_data["job_type"] = text.strip()
                        break
                        
                for text in (p_elements + all_spans):
                    tl = text.lower()
                    if ("entry level" in tl or "associate" in tl or "mid-senior" in tl or "director" in tl or "executive" in tl) and len(text) < 30:
                        job_data["experience"] = text.strip()
                        break
            except Exception:
                pass
        except Exception:
            pass
        finally:
            await page.close()
            
        # Clean defaults so charts don't break
        if job_data["experience"] == "Not Found": job_data["experience"] = "Mid-level"
        if job_data["location"] == "Not Found": job_data["location"] = "Remote"
            
        return job_data


async def execute_live_scrape(username, password, term, location, experience_level=""):
    CONCURRENT_TABS = 3

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True) 
        
        # Hydrate session from the persistent JSON file!
        if os.path.exists(STATE_FILE):
            context = await browser.new_context(storage_state=STATE_FILE)
        else:
            context = await browser.new_context()
            
        page = await context.new_page()

        encoded_term = quote_plus(term)
        encoded_loc = quote_plus(location)
        search_url = f"https://www.linkedin.com/jobs/search/?keywords={encoded_term}&location={encoded_loc}"
        
        await page.goto(search_url, wait_until="domcontentloaded")
        await asyncio.sleep(3) 

        list_container = page.locator(".jobs-search-results-list, .scaffold-layout__list")
        if await list_container.is_visible():
            for _ in range(4):
                await list_container.evaluate("el => el.scrollTo(0, el.scrollHeight)")
                await asyncio.sleep(1.5)
                
        job_links = []
        locators = await page.locator('a[href*="/jobs/view/"]').all()
        for aloc in locators:
            href = await aloc.get_attribute("href")
            if href:
                clean_url = href.split("?")[0]
                full_url = "https://www.linkedin.com" + clean_url if clean_url.startswith("/") else clean_url
                if full_url not in job_links:
                    job_links.append(full_url)
                    
        # Limit extraction for Web UI responsiveness to 15 entries 
        job_links = job_links[:15]
        
        print(f"[Scraper] Found {len(job_links)} job links to extract")
        
        if not job_links:
            # Save screenshot so we can see if LinkedIn threw a security checkpoint!
            await page.screenshot(path="linkedin_headless_block.png")

        await page.close()

        if not job_links:
            await browser.close()
            return []

        sem = asyncio.Semaphore(CONCURRENT_TABS)
        tasks = []
        for idx, link in enumerate(job_links, start=1):
            tasks.append(asyncio.create_task(extract_job_details(context, link, sem, idx, len(job_links))))
            
        all_jobs = await asyncio.gather(*tasks)
        await browser.close()
        
        return all_jobs
