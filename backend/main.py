from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import os
from bson.objectid import ObjectId
from datetime import datetime

from config import connect_to_mongo, close_mongo_connection, get_database
from models import Candidate, Job, CandidateResponse, JobResponse

# Lifespan event handlers
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    db = connect_to_mongo()
    # Create indexes
    db.candidates.create_index("email", unique=True)
    db.jobs.create_index("title")
    yield
    # Shutdown
    close_mongo_connection()


app = FastAPI(title="AptInova API - AI Recruitment Platform", lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175", "http://localhost:5174", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== Health Check ====================
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        db = get_database()
        db.admin.command('ping')
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}


# ==================== Candidates Endpoints ====================
@app.post("/api/candidates", response_model=CandidateResponse)
async def create_candidate(candidate: Candidate):
    """Create a new candidate"""
    db = get_database()
    try:
        candidate_dict = candidate.model_dump()
        candidate_dict["created_at"] = datetime.utcnow()
        result = db.candidates.insert_one(candidate_dict)
        candidate_dict["id"] = str(result.inserted_id)
        return CandidateResponse(**candidate_dict)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/candidates")
async def get_all_candidates():
    """Get all candidates"""
    db = get_database()
    candidates = []
    for doc in db.candidates.find():
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        candidates.append(doc)
    return candidates


@app.get("/api/candidates/{candidate_id}", response_model=CandidateResponse)
async def get_candidate(candidate_id: str):
    """Get a specific candidate by ID"""
    db = get_database()
    try:
        candidate = db.candidates.find_one({"_id": ObjectId(candidate_id)})
        if not candidate:
            raise HTTPException(status_code=404, detail="Candidate not found")
        candidate["id"] = str(candidate["_id"])
        del candidate["_id"]
        return CandidateResponse(**candidate)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.put("/api/candidates/{candidate_id}")
async def update_candidate(candidate_id: str, candidate: Candidate):
    """Update a candidate"""
    db = get_database()
    try:
        result = db.candidates.update_one(
            {"_id": ObjectId(candidate_id)},
            {"$set": candidate.model_dump()}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Candidate not found")
        return {"message": "Candidate updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.delete("/api/candidates/{candidate_id}")
async def delete_candidate(candidate_id: str):
    """Delete a candidate"""
    db = get_database()
    try:
        result = db.candidates.delete_one({"_id": ObjectId(candidate_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Candidate not found")
        return {"message": "Candidate deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# ==================== Jobs Endpoints ====================
@app.post("/api/jobs", response_model=JobResponse)
async def create_job(job: Job):
    """Create a new job posting"""
    db = get_database()
    try:
        job_dict = job.model_dump()
        job_dict["created_at"] = datetime.utcnow()
        result = db.jobs.insert_one(job_dict)
        job_dict["id"] = str(result.inserted_id)
        return JobResponse(**job_dict)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/jobs")
async def get_all_jobs():
    """Get all job postings"""
    db = get_database()
    jobs = []
    for doc in db.jobs.find():
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        jobs.append(doc)
    return jobs


@app.get("/api/jobs/{job_id}", response_model=JobResponse)
async def get_job(job_id: str):
    """Get a specific job by ID"""
    db = get_database()
    try:
        job = db.jobs.find_one({"_id": ObjectId(job_id)})
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        job["id"] = str(job["_id"])
        del job["_id"]
        return JobResponse(**job)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.put("/api/jobs/{job_id}")
async def update_job(job_id: str, job: Job):
    """Update a job posting"""
    db = get_database()
    try:
        result = db.jobs.update_one(
            {"_id": ObjectId(job_id)},
            {"$set": job.model_dump()}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Job not found")
        return {"message": "Job updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.delete("/api/jobs/{job_id}")
async def delete_job(job_id: str):
    """Delete a job posting"""
    db = get_database()
    try:
        result = db.jobs.delete_one({"_id": ObjectId(job_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Job not found")
        return {"message": "Job deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# ==================== Resume Upload & Dashboard ====================
@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload and process resume file"""
    try:
        contents = await file.read()
        # TODO: Implement resume parsing with pdfplumber/PyPDF2
        return {
            "filename": file.filename,
            "size": len(contents),
            "status": "uploaded",
            "message": "Resume uploaded successfully"
        }
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})


@app.get("/api/dashboard")
async def get_dashboard():
    """Get dashboard statistics"""
    db = get_database()
    try:
        total_candidates = db.candidates.count_documents({})
        total_jobs = db.jobs.count_documents({})
        
        return {
            "total_candidates": total_candidates,
            "total_jobs": total_jobs,
            "processed_resumes": 0,
            "pending_candidates": 0
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Aptinova API",
        "version": "1.0.0",
        "docs": "http://localhost:8000/docs"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
