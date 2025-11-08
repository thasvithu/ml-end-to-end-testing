from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes.predict import router as predict_router

app = FastAPI(title="Titanic Survival Prediction API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router, prefix="/api")