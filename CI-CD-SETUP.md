# CI/CD Setup Documentation

This project uses GitHub Actions for continuous integration and deployment. Below is a comprehensive guide to set up and use the CI/CD pipeline.

## 📋 Table of Contents

- [Workflows Overview](#workflows-overview)
- [Setup Instructions](#setup-instructions)
- [GitHub Secrets Configuration](#github-secrets-configuration)
- [Docker Setup](#docker-setup)
- [Deployment Options](#deployment-options)
- [Monitoring & Troubleshooting](#monitoring--troubleshooting)

## 🔄 Workflows Overview

### 1. Backend CI/CD (`backend-ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches (backend files only)
- Pull requests to `main` or `develop`

**Jobs:**
- **Test**: Runs on Python 3.11 and 3.12
  - Installs dependencies
  - Lints code with flake8
  - Checks formatting with black
  - Runs pytest (if tests exist)
  - Tests API endpoints
  
- **Build**: 
  - Trains ML model
  - Creates package distribution
  - Uploads artifacts
  
- **Docker**: 
  - Builds Docker image
  - Pushes to Docker Hub (when configured)

### 2. Frontend CI/CD (`frontend-ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches (frontend files only)
- Pull requests to `main` or `develop`

**Jobs:**
- **Test**: Runs on Node.js 18 and 20
  - Installs dependencies
  - Lints code
  - Type checks TypeScript
  - Builds application
  
- **Build and Deploy**:
  - Production build
  - Deploys to Vercel/Netlify (when configured)
  - Archives artifacts
  
- **Docker**:
  - Builds Docker image
  - Pushes to Docker Hub (when configured)

### 3. Full Stack CI/CD (`full-stack-ci.yml`)

**Triggers:**
- Push/PR to `main` branch (all changes)

**Jobs:**
- Backend tests
- Frontend tests
- Integration tests (end-to-end)
- Deploy (when all tests pass)

## 🚀 Setup Instructions

### Step 1: Initialize Git Repository

```bash
cd "g:\Machine Learning\Projects\ml-end-to-end-testing"
git init
git add .
git commit -m "Initial commit with CI/CD setup"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `ml-end-to-end-testing`
3. Don't initialize with README (you already have one)
4. Push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ml-end-to-end-testing.git
git branch -M main
git push -u origin main
```

### Step 3: Verify Workflows

1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. You should see the workflows running automatically

## 🔐 GitHub Secrets Configuration

To enable all features, configure these secrets in your repository settings:

**Repository Settings → Secrets and variables → Actions → New repository secret**

### Required Secrets for Docker (Optional)

```
DOCKER_USERNAME=your_dockerhub_username
DOCKER_PASSWORD=your_dockerhub_password_or_token
```

### Required Secrets for Vercel Deployment (Optional)

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
```

Get these from:
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel login`
3. Run `vercel link` in your frontend directory
4. Get token from Vercel dashboard → Settings → Tokens

### Required Secrets for Netlify Deployment (Optional)

```
NETLIFY_AUTH_TOKEN=your_netlify_auth_token
NETLIFY_SITE_ID=your_netlify_site_id
```

### Optional Secrets

```
API_URL=https://your-production-api-url.com
CODECOV_TOKEN=your_codecov_token (for coverage reports)
```

## 🐳 Docker Setup

### Local Testing

Build and run with Docker Compose:

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Individual Containers

**Backend:**
```bash
docker build -t titanic-backend -f Dockerfile.backend .
docker run -p 8000:8000 titanic-backend
```

**Frontend:**
```bash
cd frontend
docker build -t titanic-frontend .
docker run -p 3000:3000 titanic-frontend
```

### Push to Docker Hub

```bash
# Login
docker login

# Tag images
docker tag titanic-backend your_username/titanic-backend:latest
docker tag titanic-frontend your_username/titanic-frontend:latest

# Push
docker push your_username/titanic-backend:latest
docker push your_username/titanic-frontend:latest
```

## 🌐 Deployment Options

### Option 1: Vercel (Frontend)

**Recommended for Next.js**

1. Install Vercel CLI: `npm i -g vercel`
2. In frontend directory: `vercel`
3. Follow prompts
4. Configure environment variable: `NEXT_PUBLIC_API_URL`
5. Enable in workflow by setting `if: false` to `if: true`

### Option 2: Netlify (Frontend)

1. Go to [Netlify](https://app.netlify.com)
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Enable in workflow

### Option 3: Railway/Render (Backend)

**Railway:**
1. Go to [Railway](https://railway.app)
2. New Project → Deploy from GitHub repo
3. Select your repository
4. Railway auto-detects Python
5. Add start command: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`

**Render:**
1. Go to [Render](https://render.com)
2. New → Web Service
3. Connect repository
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`

### Option 4: AWS/Azure/GCP (Full Stack)

Use the Docker images with:
- AWS ECS/Fargate
- Azure Container Instances
- Google Cloud Run

### Option 5: Traditional VPS (DigitalOcean, Linode, etc.)

1. SSH into server
2. Install Docker and Docker Compose
3. Clone repository
4. Run `docker-compose up -d`
5. Set up nginx as reverse proxy
6. Configure SSL with Let's Encrypt

## 📊 Monitoring & Troubleshooting

### View Workflow Runs

1. Go to repository → Actions tab
2. Click on a workflow run
3. View logs for each job

### Common Issues

**❌ Workflow fails on model training**
- Ensure `train.csv` exists in `ml_pipeline/data/raw/`
- Check if data is committed (not in .gitignore)

**❌ Docker build fails**
- Check Dockerfile syntax
- Ensure all required files are present
- Verify base image availability

**❌ Frontend build fails**
- Check Node.js version compatibility
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall

**❌ Tests failing**
- Review test logs in Actions tab
- Run tests locally first
- Ensure all dependencies are in requirements.txt/package.json

### Enable/Disable Workflows

Edit the workflow files to:
- Skip jobs: Add `if: false` to job
- Skip steps: Add `if: false` to step
- Change triggers: Modify `on:` section

### Local Testing Before Push

```bash
# Backend
pip install -r requirements.txt
python -m pytest tests/
python -m ml_pipeline.src.model_training
uvicorn backend.app.main:app --reload

# Frontend
cd frontend
npm install
npm run lint
npm run build
npm run dev
```

## 🔧 Customization

### Add Tests

**Backend (`tests/test_api.py`):**
```python
import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_predict_endpoint():
    response = client.post("/api/predict", json={
        "Pclass": 1,
        "Name": "Test, Mr. User",
        "Sex": "male",
        "Age": 30,
        "SibSp": 0,
        "Parch": 0,
        "Fare": 50.0,
        "Embarked": "S"
    })
    assert response.status_code == 200
    assert "survived" in response.json()
```

**Frontend (`frontend/__tests__/index.test.tsx`):**
```typescript
import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

test('renders prediction form', () => {
  render(<Home />);
  expect(screen.getByText(/Titanic Survival Predictor/i)).toBeInTheDocument();
});
```

### Modify Deployment

Edit the workflow files to add your own deployment steps:
- Uncomment deployment sections
- Add your secrets
- Customize deployment commands

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)

## 🎯 Next Steps

1. ✅ Push code to GitHub
2. ✅ Verify workflows run successfully
3. ⬜ Add unit tests
4. ⬜ Configure deployment platform
5. ⬜ Set up monitoring and logging
6. ⬜ Configure custom domain
7. ⬜ Set up SSL/HTTPS
8. ⬜ Implement CI/CD badges in README

---

**Need Help?** Check the GitHub Actions logs or open an issue in your repository.
