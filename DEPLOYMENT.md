# Deployment Guide for Aptinova

## 🚀 Quick Deployment Steps

### Step 1: Prepare Your GitHub Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Aptinova AI Recruitment Platform"

# Create a new GitHub repository and push
git remote add origin https://github.com/NAMANUPADHYAY654/aptinova.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Frontend to Vercel

**Easiest Method - Direct Integration:**

1. Go to [Vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select `frontend` as the root directory
5. Environment Variables:
   - `VITE_API_URL`: Your backend API URL (added after backend deployment)
6. Click "Deploy"

**✅ Frontend Live URL**: `https://aptinova-[random].vercel.app`

### Step 3: Deploy Backend to Railway.app (Recommended)

**Railway.app Setup:**

1. Go to [Railway.app](https://railway.app)
2. Create a new project
3. Connect your GitHub account
4. Select your `aptinova` repository
5. Add a service:
   - Code source: Your repository
   - Root directory: `backend`
6. Variables:
   ```
   PORT=8000
   MONGO_URL=your_mongodb_atlas_url
   DB_NAME=aptinova
   ```
7. Click "Deploy"

**Add MongoDB:**
1. In Railway project dashboard
2. Click "Add"
3. Select "Add from template"
4. Choose "MongoDB"
5. Configure and deploy
6. Copy the `MONGO_URL` to your backend variables

**✅ Backend API URL**: `https://aptinova-api-[random].railway.app`

### Step 4: Update Frontend Environment

1. Go back to Vercel dashboard
2. Project settings → Environment Variables
3. Add:
   ```
   VITE_API_URL=https://aptinova-api-[random].railway.app
   ```
4. Redeploy the frontend

### Step 5: Seed the Database

```bash
# SSH into your Railway backend
# Or run locally connected to MongoDB Atlas:

python seed.py
```

---

## 📋 Alternative Deployment Options

### Option A: Render.com

**Frontend:**
1. Go to [Render.com](https://render.com)
2. Create Static Site
3. Connect GitHub repo
4. Build command: `cd frontend && npm run build`
5. Publish directory: `frontend/dist`

**Backend:**
1. Create Web Service
2. Runtime: Python 3.11
3. Build command: `pip install -r backend/requirements.txt`
4. Start command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables

### Option B: Docker Deployment

**Create Docker files:**

`backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

`frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

Then deploy using Docker Compose or any container platform.

---

## ✅ Deployment Checklist

- [ ] GitHub repository created and all code pushed
- [ ] MongoDB Atlas account created with cluster
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway/Render
- [ ] Environment variables configured
- [ ] Database seeded with sample data
- [ ] CORS origins updated in backend (if needed)
- [ ] Frontend API URL updated with backend URL
- [ ] Tested all endpoints on deployed URLs
- [ ] SSL/HTTPS verified for both frontend and backend

---

## 🔗 Final URLs (After Deployment)

**Frontend**: `https://your-frontend-url.vercel.app`
**Backend API**: `https://your-backend-url.railway.app`
**API Docs**: `https://your-backend-url.railway.app/docs`
**Swagger UI**: `https://your-backend-url.railway.app/redoc`

---

## 🐛 Troubleshooting Deployment

### Frontend Not Loading API
- Check VITE_API_URL environment variable
- Verify CORS settings in backend
- Check browser console for network errors

### Backend Connection Issues
- Verify MONGO_URL is correct
- Check MongoDB Atlas whitelist includes your IP or 0.0.0.0
- Test health endpoint: `/health`

### Database Not Seeding
- Connect to MongoDB Atlas using MongoDB Compass
- Verify DB_NAME matches collection names
- Run seed script from backend directory

### Build Failures
- Check Node version in Vercel (should be 18+)
- Check Python version in Railway (should be 3.10+)
- Verify all dependencies are in requirements.txt/package.json

---

## 📞 Support

For issues:
1. Check the deployment platform's logs
2. Verify environment variables are set correctly
3. Test locally first before deploying
4. Review error messages in browser console and backend logs
