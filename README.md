# 🚢 Titanic Survival Prediction - ML End-to-End Project

[![Backend CI/CD](https://github.com/thasvithu/ml-end-to-end-testing/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/thasvithu/ml-end-to-end-testing/actions/workflows/backend-ci.yml)
[![Frontend CI/CD](https://github.com/thasvithu/ml-end-to-end-testing/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/thasvithu/ml-end-to-end-testing/actions/workflows/frontend-ci.yml)
[![Full Stack CI/CD](https://github.com/thasvithu/ml-end-to-end-testing/actions/workflows/full-stack-ci.yml/badge.svg)](https://github.com/thasvithu/ml-end-to-end-testing/actions/workflows/full-stack-ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack machine learning application that predicts Titanic passenger survival using a trained ML model, FastAPI backend, and Next.js frontend with complete CI/CD pipeline.

## ✨ Features

- 🤖 **Machine Learning**: Scikit-learn Linear Regression model
- ⚡ **FastAPI Backend**: High-performance REST API with automatic documentation
- 🎨 **Modern Frontend**: Beautiful Next.js UI with TypeScript and Tailwind CSS
- 🔄 **CI/CD Pipeline**: Automated testing, building, and deployment with GitHub Actions
- 🐳 **Docker Support**: Containerized services with Docker Compose
- 📊 **Real-time Predictions**: Interactive form with instant survival predictions
- 🌓 **Dark Mode**: Automatic theme switching
- 📱 **Responsive Design**: Mobile-first approach

## 🏗️ Architecture

```
┌─────────────────────┐
│   Frontend (Next.js) │
│   Port: 3000         │
└──────────┬──────────┘
           │ HTTP
           ▼
┌─────────────────────┐
│  Backend (FastAPI)  │
│   Port: 8000        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   ML Model          │
│   (Scikit-learn)    │
│   model.joblib      │
└─────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn
- (Optional) Docker & Docker Compose

### Option 1: Local Development

**1. Clone the repository**
```bash
git clone https://github.com/thasvithu/ml-end-to-end-testing.git
cd ml-end-to-end-testing
```

**2. Backend Setup**
```bash
# Install Python dependencies
pip install -r requirements.txt

# Train the ML model
python -m ml_pipeline.src.model_training

# Start the backend server
uvicorn backend.app.main:app --reload --port 8000
```

Backend will be available at `http://localhost:8000`  
API docs at `http://localhost:8000/docs`

**3. Frontend Setup**
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at `http://localhost:3000`

### Option 2: Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

Access:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`

## 📁 Project Structure

```
ml-end-to-end-testing/
├── backend/                    # FastAPI backend
│   └── app/
│       ├── main.py            # FastAPI application
│       ├── api/               # API routes
│       │   └── routes/
│       │       └── predict.py # Prediction endpoint
│       └── ml/                # ML inference
│           ├── inference.py   # Prediction logic
│           ├── preprocessing.py
│           └── model.joblib   # Trained model
├── frontend/                   # Next.js frontend
│   ├── src/
│   │   ├── pages/            # Next.js pages
│   │   │   └── index.tsx     # Main prediction UI
│   │   ├── styles/           # Global styles
│   │   └── types.ts          # TypeScript types
│   ├── Dockerfile            # Frontend Docker image
│   └── package.json
├── ml_pipeline/               # ML training pipeline
│   ├── data/
│   │   └── raw/
│   │       └── train.csv     # Training data
│   ├── notebooks/            # Jupyter notebooks
│   │   └── 01_eda.ipynb
│   └── src/
│       ├── data_preparation.py
│       └── model_training.py # Model training script
├── tests/                     # Test suite
│   ├── conftest.py
│   ├── test_api.py           # API tests
│   └── test_ml.py            # ML tests
├── .github/
│   └── workflows/            # GitHub Actions workflows
│       ├── backend-ci.yml
│       ├── frontend-ci.yml
│       └── full-stack-ci.yml
├── config.py                  # Project configuration
├── requirements.txt           # Python dependencies
├── pyproject.toml            # Python project metadata
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile.backend        # Backend Docker image
├── CI-CD-SETUP.md           # Detailed CI/CD documentation
└── QUICKSTART.md            # Quick startup guide
```

## 🧪 Testing

### Run Backend Tests
```bash
# Install test dependencies
pip install pytest pytest-cov pytest-asyncio httpx

# Run tests
pytest tests/ -v

# With coverage
pytest tests/ -v --cov=backend --cov-report=html
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

### Run All Tests (CI/CD)
Tests run automatically on every push via GitHub Actions.

## 🔄 CI/CD Pipeline

This project includes comprehensive CI/CD workflows:

### Workflows

1. **Backend CI/CD** (`backend-ci.yml`)
   - Python linting (flake8) and formatting (black)
   - Automated testing
   - Model training validation
   - Docker image building

2. **Frontend CI/CD** (`frontend-ci.yml`)
   - ESLint checking
   - TypeScript type checking
   - Production build validation
   - Docker image building

3. **Full Stack CI/CD** (`full-stack-ci.yml`)
   - Integration testing
   - End-to-end API testing
   - Deployment coordination

### Setup Instructions

See [CI-CD-SETUP.md](./CI-CD-SETUP.md) for detailed configuration instructions.

**Quick Setup:**
1. Push code to GitHub
2. Workflows run automatically
3. Configure secrets for deployment (optional)
4. Enable deployment steps in workflow files

## 🌐 Deployment

### Supported Platforms

- **Frontend**: Vercel, Netlify, Docker
- **Backend**: Railway, Render, AWS, Azure, GCP, Docker
- **Full Stack**: Docker Compose on any VPS

See [CI-CD-SETUP.md](./CI-CD-SETUP.md) for deployment guides.

## 📊 ML Model

- **Algorithm**: Linear Regression
- **Features**: Passenger class, age, sex, fare, family size, title, embarkation port
- **Preprocessing**: Title extraction, missing value imputation, one-hot encoding
- **Accuracy**: Check training output for metrics

### Retrain Model

```bash
python -m ml_pipeline.src.model_training
```

## 🔧 Configuration

### Environment Variables

**Backend:**
- No environment variables required for local development

**Frontend:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Docker Environment

Edit `docker-compose.yml` to configure:
- Port mappings
- Environment variables
- Volume mounts
- Network settings

## 📝 API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI Schema**: `http://localhost:8000/openapi.json`

### Example API Request

```bash
curl -X POST "http://localhost:8000/api/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "Pclass": 1,
    "Name": "Smith, Mr. John",
    "Sex": "male",
    "Age": 30,
    "SibSp": 0,
    "Parch": 0,
    "Fare": 50.0,
    "Embarked": "S"
  }'
```

### Response

```json
{
  "survived": 1,
  "predicted_value": 0.823
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Titanic dataset from Kaggle
- FastAPI framework
- Next.js and Vercel team
- Scikit-learn library

## 📧 Contact

V.Vithusan - [@thasvithu](https://www.linkedin.com/in/thasvithu)

Project Link: [https://github.com/thasvithu/ml-end-to-end-testing](https://github.com/thasvithu/ml-end-to-end-testing)

---

⭐ Star this repo if you find it helpful! :)
