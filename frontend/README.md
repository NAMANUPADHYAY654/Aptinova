# 🚀 Aptinova - AI-Powered Recruitment Platform

**An intelligent resume parsing and candidate ranking system that leverages artificial intelligence to streamline your recruitment process.**

---

## 📋 Project Overview

Aptinova is a full-stack web application designed to revolutionize the way recruitment teams evaluate candidates. Built with modern technologies, it automatically parses resumes, extracts key information, and ranks candidates based on job requirements using advanced AI algorithms.

### What Makes Aptinova Special?

- **🤖 AI-Powered Analysis**: Intelligent resume parsing that extracts skills, experience, and qualifications automatically
- **⚡ Fast & Efficient**: Process hundreds of resumes in minutes instead of hours
- **📊 Smart Ranking**: Candidates are ranked based on AI job fit scores, highlighting the best matches first
- **🎨 Beautiful UI**: Modern, responsive interface built with React and Framer Motion animations
- **🔧 Easy Integration**: RESTful API backend ready for integration with your existing systems
- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool and dev server
- **Framer Motion** - Smooth animations and transitions
- **Axios** - HTTP client for API calls
- **Recharts** - Beautiful, responsive charts for analytics
- **Lucide React** - Modern icon library
- **React Hot Toast** - Elegant toast notifications

### Backend
- **FastAPI** - Modern Python web framework with async support
- **Uvicorn** - ASGI web server
- **Pydantic** - Data validation and serialization
- **MongoDB** - NoSQL database for persistent data storage
- **PyMongo** - MongoDB driver for Python
- **Python 3.13** - Latest Python runtime

---

## 📁 Project Structure

```
aptinova/
├── frontend/                    # React + Vite web application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── Dashboard.jsx   # Analytics and overview dashboard
│   │   │   ├── CandidateList.jsx # Candidate tracking and ranking
│   │   │   └── UploadModal.jsx   # Resume upload modal
│   │   ├── App.jsx             # Main application component
│   │   ├── main.jsx            # Entry point
│   │   └── App.css             # Global styles
│   ├── index.html              # HTML template
│   ├── package.json            # Dependencies and scripts
│   └── vite.config.js          # Vite configuration
│
└── backend/                    # FastAPI + MongoDB application
    ├── main.py                 # FastAPI application entry point
    ├── config.py               # MongoDB configuration and connection
    ├── models.py               # Pydantic data models
    ├── seed.py                 # Database seeding script
    ├── requirements.txt        # Python dependencies
    ├── .env                    # Environment variables
    ├── MONGODB_SETUP.md        # MongoDB setup guide
    └── venv_new/               # Python virtual environment
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js 18+** (for frontend)
- **Python 3.10+** (for backend)
- **npm** or **yarn** (for frontend package management)

### Installation & Setup

#### 1. Clone or Setup the Project

```bash
cd aptinova
```

#### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at: **http://localhost:5175**

#### 3. Backend Set_new
source venv_new/bin/activate  # On Windows: venv_new\Scripts\activate
pip install -r requirements.txt

# Seed the database with sample data
python seed.py

# Start the backend server
python main.py
```

Or use uvicorn directly:

```bash
cd backend
uvicorn main:app --reload --port 8000
```

The backend API will be available at: **http://localhost:8000**

### 4. MongoDB Setup

#### Option A: Local MongoDB Installation
- Download from: [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
- Installation will create a local service on `localhost:27017`

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `.env` file: `MONGO_URL=your_connection_string`

The `.env` file should have:
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=aptinova
```
uvicorn main:app --reload --port 8000
```

The backend API will be available at: **http://localhost:8000**

---

## 🎯 Key Features

### 📊 Analytics Dashboard
- Real-time statistics on active jobs and processed resumes
- Visual charts showing resume processing trends
- Skill demand analysis
- Recruiter efficiency metrics

### 👥 Candidate Tracking
- Filter candidates by job position
- View AI-calculated job fit scores
- Quick access to extracted skills and experience
- BeCandidates
- `GET /api/candidates` - Fetch all candidates
- `POST /api/candidates` - Create a new candidate
- `GET /api/candidates/{id}` - Get candidate details
- `PUT /api/candidates/{id}` - Update candidate information
- `DELETE /api/candidates/{id}` - Remove candidate

### Jobs
- `GET /api/jobs` - Fetch all job postings
- `POST /api/jobs` - Create a new job posting
- `GET /api/jobs/{id}` - Get job details
- `PUT /api/jobs/{id}` - Update job information
- `DELETE /api/jobs/{id}` - Remove job posting

### Utilities
- `GET /health` - Health check with MongoDB status
- `GET /api/dashboard` - Dashboard statistics
- `POST /api/upload` - Upload and process resumes

### API Documentation
Interactive API docs available at: **http://localhost:8000/docs** (Swagger UI)
- Experience level detection

### 🔐 User-Friendly Design
- Dark theme optimized for easy viewing
- Smooth animations and transitions
- Glass-morphism design aesthetic
- Intuitive navigation sidebar

---

## 📝 API Endpoints

### Jobs
- `GET /api/jobs` - Fetch all active job postings
- `POST /api/jobs` - Create a new job posting

### Candidates
- `GET /api/candidates/{job_id}` - Get candidates for a specific job
- `POST /api/candidates/upload` - Upload and parse resumes
- `GET /api/candidates/{candidate_id}` - Get detailed candidate profile

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

---

## 🎨 Design Features

## 📊 Sample Data

The application comes with sample data featuring Indian professionals. Run the seed script to populate:

```bash
cd backend
python seed.py
```

This creates:
- **6 Sample Candidates** with realistic Indian names and profiles
- **4 Job Postings** matching various skill levels
- **Automatic Indexes** for optimized queries

| Name | Experience | Key Skills | Job Fit Score |
|------|------------|-----------|----------------|
| Rajesh Kumar | 5 years | Python, Django, PostgreSQL | 85% |
| Priya Sharma | 4 years | React, Node.js, MongoDB | 78% |
| Amit Patel | 6 years | Java, Spring Boot, AWS | 92% |
| Anjali Singh | 3 years | JavaScript, React, CSS | 72% |
| Vikram Desai | 7 years | Python, Machine Learning | 88% |
| Neha Verma | 4 years | Java, SQL, Spring Framework | 80
---

## 🔄 Workflow

1. **Upload Resumes** - Recruiters upload candidate resumes in bulk
2. **Parse & Extract** - AI automatically extracts skills, experience, and qualifications
3. **Score Candidates** - Candidates are ranked based on job fit using sophisticated algorithms
4. **Review & Track** - Visually compare candidates and track their fit scores
5. **Make Decisions** - Data-driven insights to make better hiring decisions

---

## 🌟 Sample Candidate Pool

The application comes with sample candidate data featuring Indian professionals:

| Name | Experience | Key Skills | Job Fit Score |
|------|------------|-----------|----------------|
| Rajesh Kumar | 5 years | Python, Django, PostgreSQL | 85% |
| Priya Sharma | 4 years | React, Node.js, MongoDB | 78% |
| Amit Patel | 6 years | Java, Spring Boot, AWS | 92% |
| Anjali Singh | 3 years | JavaScript, React, CSS | 72% |
| Vikram Desai | 7 years | Python, Machine Learning | 88% |

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Configure environment variables (if any)
5. Deploy in one click!

**Vercel Link**: `https://your-aptinova.vercel.app`

### Backend Deployment Options

#### Option 1: Railway.app (Recommended)
1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add MongoDB addon or link to MongoDB Atlas
4. Deploy automatically on git push

#### Option 2: Render.com
1. Create account on [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables
5. Deploy

#### Option 3: Heroku
```bash
heroku create aptinova-api
heroku config:set MONGO_URL=your_mongodb_connection_string
git push heroku main
```

**Backend API Base URL**: Will be provided by your deployment platform

### Environment Variables for Deployment

Make sure to set these in your deployment platform:
```
MONGO_URL=your_mongodb_atlas_connection_string
DB_NAME=aptinova
FRONTEND_URL=your_deployed_frontend_url
```
## 🔐 Security Features

- CORS middleware configured for secure cross-origin requests
- Input validation on all API endpoints
- Environment-based configuration
- Secure file upload handling

---

## 📈 Future Enhancements

- [ ] Integration with ATS (Applicant Tracking Systems)
- [ ] Advanced ML models for better candidate matching
- [ ] Multi-language resume support
- [ ] Video interview integration
- [ ] Candidate communication tools
- [ ] Advanced filtering and search
- [ ] Team collaboration features
- [ ] Export reports and analytics

---

## 🤝 Contributing

This project was built with ❤️ to solve real recruitment challenges. Feel free to fork, modify, and improve!

---

## 📄 License

This project is proprietary and built for recruitment excellence.

---

## 💬 Support & Contact

For any questions or suggestions about Aptinova, please feel free to reach out.

**Created by:** Naman  
**Version:** 1.0.0  
**Last Updated:** February 28, 2026

---

## 🎓 Learning Resources

This project demonstrates:
- Modern React development with hooks and functional components
- FastAPI backend development with async/await
- RESTful API design principles
- Beautiful UI/UX with animations
- Data visualization with charts
- File upload handling
- Cross-origin resource sharing (CORS)

---

**Happy Recruiting! 🚀**

