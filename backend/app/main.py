from fastapi import FastAPI
from .api.routes.predict import router as predict_router

app = FastAPI(title="Titanic Survival Prediction API")
app.include_router(predict_router, prefix="/api")