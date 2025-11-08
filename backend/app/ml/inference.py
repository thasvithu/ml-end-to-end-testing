import joblib
import pandas as pd
from . preprocessing import preprocess
from config import MODEL_PATH

# Load pre-trained model
model = joblib.load(MODEL_PATH)

FEATURES = ['Pclass','Age','SibSp','Parch','Fare','Sex_male','Embarked_Q','Embarked_S','Title_Mr','Title_Mrs','Title_Miss']


def predict_single(record: dict) -> dict:
    """
    record: dict with keys matching Titanic features
    returns: dict with predicted survival and probability
    """
    df = pd.DataFrame([record])
    df = preprocess(df)
    
    X = df[FEATURES]
    pred_value = model.predict(X)[0]
    
    # Since linear regression output is continuous, round to 0 or 1
    survived = int(round(pred_value))
    
    return {
        "survived": survived,
        "predicted_value": float(pred_value)
    }