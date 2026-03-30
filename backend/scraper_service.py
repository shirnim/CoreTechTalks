import os
import asyncio
from urllib.parse import quote_plus
from playwright.async_api import async_playwright

STATE_FILE = "linkedin_state.json"

async def verify_linkedin_credentials(username, password):
    """
    Attempts to log into LinkedIn. If successful, saves the session cookies to a JSON file.
    Returns True if authenticated, False if invalid or timed out.
    """
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        
        if os.path.exists(STATE_FILE):
            try:
                context = await browser.new_context(storage_state=STATE_FILE)
                page = await context.new_page()
                await page.goto("https://www.linkedin.com/feed/", wait_until="domcontentloaded", timeout=15000)
                if "feed" in page.url or "jobs" in page.url:
                    await browser.close()
                    return True
                await context.close()
            except Exception:
                pass

        context = await browser.new_context()
        page = await context.new_page()

        try:
            await page.goto("https://www.linkedin.com/login", wait_until="domcontentloaded")
            await page.fill("#username", username)
            await page.fill("#password", password)
            await page.click("button[type='submit']")

            elapsed = 0
            while elapsed < 90:
                page_content = await page.content()
                if "error-for-password" in page_content or "error-for-username" in page_content:
                    await browser.close()
                    return False
                
                # Success checks (if URL moves away from login/checkpoint screens)
                if "login" not in page.url and "checkpoint" not in page.url:
                    break
                
                await asyncio.sleep(2)
                elapsed += 2

            # Check if we finally made it out of the login wall
            if "login" not in page.url:
                await context.storage_state(path=STATE_FILE)
                await browser.close()
                return True
            else:
                await browser.close()
                return False
                
        except Exception as e:
            print("Verify Error:", e)
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
            "job_link": target_url
        }
        try:
            await page.goto(target_url, wait_until="domcontentloaded", timeout=45000)
            await asyncio.sleep(3)
            
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
        browser = await p.chromium.launch(headless=False) 
        
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
