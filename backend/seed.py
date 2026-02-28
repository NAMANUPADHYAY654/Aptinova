"""
Seed MongoDB with sample candidate and job data
Run this file to populate the database with initial data
"""
from config import connect_to_mongo, get_database
from datetime import datetime

def seed_database():
    """Seed MongoDB with sample data"""
    db = get_database()
    
    # Sample candidates with Indian names
    candidates = [
        {
            "name": "Rajesh Kumar",
            "email": "rajesh.kumar@example.com",
            "phone": "+91-9876543210",
            "skills": ["Python", "Django", "PostgreSQL", "Docker", "AWS"],
            "experience_years": 5,
            "education": "B.Tech Computer Science",
            "job_fit_score": 85.0,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Priya Sharma",
            "email": "priya.sharma@example.com",
            "phone": "+91-9876543211",
            "skills": ["React", "Node.js", "MongoDB", "JavaScript", "CSS"],
            "experience_years": 4,
            "education": "B.Tech IT",
            "job_fit_score": 78.0,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Amit Patel",
            "email": "amit.patel@example.com",
            "phone": "+91-9876543212",
            "skills": ["Java", "Spring Boot", "Kubernetes", "AWS", "Microservices"],
            "experience_years": 6,
            "education": "M.Tech Software Engineering",
            "job_fit_score": 92.0,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Anjali Singh",
            "email": "anjali.singh@example.com",
            "phone": "+91-9876543213",
            "skills": ["JavaScript", "React", "CSS", "Firebase", "Figma"],
            "experience_years": 3,
            "education": "B.Tech CS",
            "job_fit_score": 72.0,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Vikram Desai",
            "email": "vikram.desai@example.com",
            "phone": "+91-9876543214",
            "skills": ["Python", "Machine Learning", "TensorFlow", "Scikit-Learn", "Data Analysis"],
            "experience_years": 7,
            "education": "M.Tech AI & ML",
            "job_fit_score": 88.0,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Neha Verma",
            "email": "neha.verma@example.com",
            "phone": "+91-9876543215",
            "skills": ["Java", "SQL", "Spring Framework", "REST APIs", "Testing"],
            "experience_years": 4,
            "education": "B.Tech Computer Science",
            "job_fit_score": 80.0,
            "created_at": datetime.utcnow()
        }
    ]
    
    # Sample job postings
    jobs = [
        {
            "title": "Full Stack AI Engineer",
            "description": "We are looking for a talented Full Stack Engineer with experience in Python, FastAPI for backend and React for frontend. Knowledge of Machine Learning is a big plus.",
            "required_skills": ["Python", "React", "FastAPI", "Machine Learning"],
            "experience_required": 3,
            "location": "Bangalore, India",
            "salary_range": "15-25 LPA",
            "created_at": datetime.utcnow()
        },
        {
            "title": "Senior Java Developer",
            "description": "Seeking an experienced Java developer proficient in Spring Boot, microservices architecture, and cloud technologies like AWS and Kubernetes.",
            "required_skills": ["Java", "Spring Boot", "AWS", "Kubernetes", "Microservices"],
            "experience_required": 5,
            "location": "Hyderabad, India",
            "salary_range": "20-30 LPA",
            "created_at": datetime.utcnow()
        },
        {
            "title": "Data Scientist",
            "description": "Looking for a Data Scientist with expertise in Python, Machine Learning, and data analysis. Experience with TensorFlow and Scikit-Learn is required.",
            "required_skills": ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL"],
            "experience_required": 4,
            "location": "Mumbai, India",
            "salary_range": "18-28 LPA",
            "created_at": datetime.utcnow()
        },
        {
            "title": "React Frontend Developer",
            "description": "Seeking a talented React developer to build modern, responsive web applications. Strong CSS and JavaScript skills required.",
            "required_skills": ["React", "JavaScript", "CSS", "HTML", "REST APIs"],
            "experience_required": 2,
            "location": "Delhi, India",
            "salary_range": "12-18 LPA",
            "created_at": datetime.utcnow()
        }
    ]
    
    # Clear existing data and insert new data
    print("🗑️  Clearing existing data...")
    db.candidates.delete_many({})
    db.jobs.delete_many({})
    
    print("📝 Inserting candidate data...")
    candidates_result = db.candidates.insert_many(candidates)
    print(f"✅ Inserted {len(candidates_result.inserted_ids)} candidates")
    
    print("📝 Inserting job postings...")
    jobs_result = db.jobs.insert_many(jobs)
    print(f"✅ Inserted {len(jobs_result.inserted_ids)} job postings")
    
    print("\n✨ Database seeding completed successfully!")
    print(f"   - Total Candidates: {db.candidates.count_documents({})}")
    print(f"   - Total Jobs: {db.jobs.count_documents({})}")


if __name__ == "__main__":
    try:
        seed_database()
    except Exception as e:
        print(f"❌ Error during seeding: {e}")
