"""
MongoDB Setup Guide for Aptinova

This document explains how to set up MongoDB for the Aptinova project.

## Option 1: Local MongoDB Installation

### Windows:
1. Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will be installed as a Windows Service and run on localhost:27017

### macOS:
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

### Linux (Ubuntu/Debian):
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb

## Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a cluster
4. Get your connection string
5. Update MONGO_URL in .env file with your connection string

Example: mongodb+srv://username:password@cluster.mongodb.net/aptinova?retryWrites=true&w=majority

## Setup Instructions:

1. Make sure MongoDB is running on your system
2. Update .env file with your MongoDB connection details:
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=aptinova

3. Install Python dependencies:
   pip install -r requirements.txt

4. Seed the database with sample data:
   python seed.py

5. Start the FastAPI server:
   python main.py

## Database Collections:

- **candidates**: Stores candidate information
  - Fields: name, email, phone, skills, experience_years, education, job_fit_score, created_at

- **jobs**: Stores job postings
  - Fields: title, description, required_skills, experience_required, location, salary_range, created_at

## API Endpoints:

### Candidates:
- GET /api/candidates - Get all candidates
- POST /api/candidates - Create a new candidate
- GET /api/candidates/{id} - Get a specific candidate
- PUT /api/candidates/{id} - Update a candidate
- DELETE /api/candidates/{id} - Delete a candidate

### Jobs:
- GET /api/jobs - Get all job postings
- POST /api/jobs - Create a new job
- GET /api/jobs/{id} - Get a specific job
- PUT /api/jobs/{id} - Update a job
- DELETE /api/jobs/{id} - Delete a job

### Other:
- GET /health - Health check with MongoDB connection status
- GET /api/dashboard - Get dashboard statistics
- POST /api/upload - Upload resume file

## Troubleshooting:

1. MongoDB Connection Error:
   - Ensure MongoDB is running
   - Check MONGO_URL in .env file
   - Verify firewall settings

2. Permission Denied:
   - Check MongoDB user credentials
   - Verify database permissions

3. Collection Not Found:
   - Run python seed.py to create collections and insert initial data
   - Verify database name in .env file
"""
