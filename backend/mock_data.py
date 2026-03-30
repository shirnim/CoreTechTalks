import random
from datetime import datetime, timedelta

def generate_mock_jobs(count=200):
    titles = [
        "Software Quality Assurance Engineer", "QA Automation Engineer", "Senior QA Lead",
        "Test Engineer", "Software Developer in Test (SDET)", "Manual QA Tester",
        "Performance Test Engineer", "Security QA Analyst", "Frontend Developer",
        "Backend Developer", "Full Stack Engineer", "DevOps Engineer",
        "Data Scientist", "Machine Learning Engineer", "Product Manager"
    ]
    
    companies = [
        "Tech Mahindra", "Infosys", "TCS", "Google", "Amazon", "Netflix", 
        "Meta", "Apple", "UST", "HighLevel", "Alignerr", "Adastra", "Wipro",
        "Microsoft", "Oracle", "IBM"
    ]
    
    locations = [
        "Mumbai", "Pune", "Bengaluru", "Hyderabad", "Remote", "Delhi",
        "Chennai", "Gurugram", "Noida", "Kochi", "Mumbai (Hybrid)", "Bengaluru (Hybrid)"
    ]
    
    levels = ["Entry-level", "Mid-level", "Senior", "Lead", "Director"]
    types = ["Full-time", "Contract", "Part-time", "Internship"]
    
    jobs = []
    
    for i in range(count):
        # Weighting recent dates heavily
        days_ago = random.randint(0, 30) if random.random() > 0.3 else random.randint(0, 7)
        date_obj = datetime.now() - timedelta(days=days_ago)
        
        job = {
            "id": i + 1,
            "job_title": random.choice(titles),
            "company": random.choice(companies),
            "location": random.choice(locations),
            "experience": random.choice(levels),
            "job_type": random.choice(types),
            "posted_date": date_obj.strftime("%Y-%m-%d"),
            "job_link": f"https://example.com/jobs/{i+1}"
        }
        jobs.append(job)
        
    return jobs

MOCK_JOBS = generate_mock_jobs(350)
