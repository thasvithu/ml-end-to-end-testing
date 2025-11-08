from fastapi import APIRouter
from pydantic import BaseModel
from backend.app.ml.inference import predict_single

router = APIRouter()

class Passenger(BaseModel):
    Pclass: int
    Name: str
    Sex: str
    Age: float | None = None
    SibSp: int
    Parch: int
    Fare: float | None = 0.0
    Embarked: str | None = 'S'
    
@router.post("/predict")
async def predict(passenger: Passenger):
    rec = passenger.dict()
    result = predict_single(rec)
    return result