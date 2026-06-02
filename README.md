# 🚀 Aptinova - AI-Powered Recruitment Platform

> **Revolutionizing hiring with intelligent resume parsing and candidate ranking**

[![GitHub](https://img.shields.io/badge/GitHub-NAMANUPADHYAY654%2Faptinova-blue?logo=github)](https://github.com/NAMANUPADHYAY654/aptinova)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?logo=fastapi)](https://fastapi.tiangolo.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-NoSQL-green?logo=mongodb)](https://mongodb.com)
[![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📋 Table of Content

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📡 API Documentation](#-api-documentation)
- [🌐 Deployment](#-deployment)
- [📊 Sample Data](#-sample-data)

---

## 🎯 Overview

**Aptinova** is a full-stack web application designed to streamline and automate the recruitment process. It intelligently parses resumes, extracts candidate information, and ranks candidates based on job requirements using AI algorithms.

### Problem Solved:
- ❌ Manual resume review is time-consuming
- ❌ Inconsistent candidate evaluation
- ❌ Missing qualified candidates

### Solution:
- ✅ Automated resume parsing
- ✅ Consistent AI-based ranking
- ✅ Beautiful dashboard for insights
- ✅ Fast and efficient hiring process

---

## ✨ Features

### 🎯 Core Features
- **📄 Resume Parsing**: Automatically extract skills, experience, and education
- **🤖 AI Job Fit Scoring**: Intelligent candidate ranking (0-100%)
- **📊 Analytics Dashboard**: Real-time recruitment metrics
- **👥 Candidate Management**: Track and manage candidates
- **📝 Job Postings**: Create and manage job openings
- **🔍 Advanced Search**: Filter candidates by skills and experience

### 💎 Premium Features
- **📤 Bulk Resume Upload**: Process multiple resumes at once
- **📈 Performance Analytics**: Track recruitment KPIs
- **🔐 Secure Data**: MongoDB encryption and backups
- **⚡ Fast Processing**: Sub-2-second resume parsing
- **📱 Responsive Design**: Works on all devices
- **🌙 Dark Mode**: Eye-friendly interface

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library |
| **Vite** | Build tool & dev server |
| **Framer Motion** | Smooth animations |
| **Recharts** | Data visualization |
| **Axios** | HTTP client |

### Backend
| Technology | Purpose |
|-----------|---------|
| **FastAPI** | Web framework |
| **Uvicorn** | ASGI server |
| **MongoDB** | NoSQL database |
| **PyMongo** | MongoDB driver |
| **Pydantic** | Data validation |

---

## 📁 Project Structure

```
aptinova/
├── 📁 frontend/          # React + Vite application
│   ├── src/
│   │   ├── components/   # Dashboard, CandidateList, UploadModal
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
│
├── 📁 backend/           # FastAPI + MongoDB application
│   ├── main.py           # FastAPI app (200+ lines)
│   ├── config.py         # MongoDB config
│   ├── models.py         # Pydantic models
│   ├── seed.py           # Database seeding
│   ├── requirements.txt
│   └── .env
│
├── README.md             # This file
├── DEPLOYMENT.md         # Deployment guide
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** 
- **Python 3.10+** 
- **MongoDB 4.4+** or **MongoDB Atlas** (Cloud)
- **Git**

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/NAMANUPADHYAY654/aptinova.git
cd aptinova
```

#### 2️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

**Frontend running at**: `http://localhost:5175`

#### 3️⃣ Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv_new

# Activate (Windows)
venv_new\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Seed database
python seed.py

# Run server
python main.py
```

**Backend running at**: `http://localhost:8000`

---

## 📡 API Documentation

### Interactive Docs
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Main Endpoints

```
GET    /api/candidates           # List candidates
POST   /api/candidates           # Create candidate
GET    /api/jobs                 # List jobs
POST   /api/jobs                 # Create job
GET    /health                   # Health check
```

---

## 📊 Sample Data

### 6 Sample Candidates

| Name | Experience | Skills | Score |
|------|-----------|--------|-------|
| Rajesh Kumar | 5 years | Python, Django | 85% |
| Priya Sharma | 4 years | React, Node.js | 78% |
| Amit Patel | 6 years | Java, Spring | 92% |
| Anjali Singh | 3 years | JavaScript, React | 72% |
| Vikram Desai | 7 years | Python, ML | 88% |
| Neha Verma | 4 years | Java, SQL | 80% |

### Load Sample Data

```bash
cd backend
python seed.py
```

---

## 🌐 Deployment

### Frontend (Vercel)
1. Go to vercel.com
2. Import GitHub repo
3. Root Directory: `frontend`
4. Deploy!

### Backend (Railway)
1. Go to railway.app
2. Import GitHub repo
3. Root Directory: `backend`
4. Add MongoDB addon
5. Deploy!

**Full guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🔗 Links

- **GitHub**: https://github.com/NAMANUPADHYAY654/aptinova
- **Frontend Docs**: See `frontend/README.md`
- **Backend Docs**: See `backend/MONGODB_SETUP.md`
- **Deployment Docs**: See `DEPLOYMENT.md`

---

## 🎯 Quick Start (TL;DR)

```bash
# Clone
git clone https://github.com/NAMANUPADHYAY654/aptinova.git && cd aptinova

# Frontend (Terminal 1)
cd frontend && npm install && npm run dev

# Backend (Terminal 2)
cd backend && pip install -r requirements.txt && python seed.py && python main.py

# Visit
# http://localhost:5175  (Frontend)
# http://localhost:8000/docs  (API)
```

---

## 📞 Support

- 📖 Check documentation in `DEPLOYMENT.md` and `MONGODB_SETUP.md`
- 🐛 Report issues on GitHub
- 💡 Suggest features via GitHub Issues

---

## ⭐ Show Your Support

If you found this helpful:
- Star the repository ⭐
- Share with others 🔗
- Report bugs 🐛
- Suggest features 💡

---

**Built with ❤️ by [Naman Upadhyay](https://github.com/NAMANUPADHYAY654)**

**Version**: 1.0.0 | **Status**: Active ✨ | **Last Updated**: February 28, 2026
