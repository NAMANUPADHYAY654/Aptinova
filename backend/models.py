"""
Pydantic models for data validation
"""
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime


class Candidate(BaseModel):
    """Candidate model"""
    name: str
    email: EmailStr
    phone: Optional[str] = None
    skills: List[str]
    experience_years: int
    education: str
    resume_url: Optional[str] = None
    job_fit_score: Optional[float] = None
    created_at: Optional[datetime] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Rajesh Kumar",
                "email": "rajesh@example.com",
                "skills": ["Python", "Django", "PostgreSQL"],
                "experience_years": 5,
                "education": "B.Tech Computer Science"
            }
        }


class Job(BaseModel):
    """Job posting model"""
    title: str
    description: str
    required_skills: List[str]
    experience_required: int
    location: Optional[str] = None
    salary_range: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Full Stack AI Engineer",
                "description": "Looking for a talented full stack engineer",
                "required_skills": ["Python", "React", "FastAPI"],
                "experience_required": 3
            }
        }


class CandidateResponse(BaseModel):
    """Response model for candidate"""
    id: str
    name: str
    email: str
    skills: List[str]
    experience_years: int
    education: str
    job_fit_score: Optional[float] = None


class JobResponse(BaseModel):
    """Response model for job"""
    id: str
    title: str
    description: str
    required_skills: List[str]
    experience_required: int
