"""
Test cases for ML preprocessing and inference
"""
import pytest
import pandas as pd
from backend.app.ml.preprocessing import preprocess
from backend.app.ml.inference import predict_single


class TestPreprocessing:
    """Test suite for data preprocessing"""
    
    def test_preprocess_extracts_title(self):
        """Test that title is correctly extracted from name"""
        df = pd.DataFrame([{
            "Name": "Smith, Mr. John",
            "Sex": "male",
            "Age": 30,
            "Embarked": "S"
        }])
        
        result = preprocess(df)
        assert "Title" in result.columns
    
    def test_preprocess_fills_missing_age(self):
        """Test that missing ages are filled"""
        df = pd.DataFrame([{
            "Name": "Smith, Mr. John",
            "Sex": "male",
            "Age": None,
            "Embarked": "S"
        }])
        
        result = preprocess(df)
        assert not result["Age"].isna().any()
    
    def test_preprocess_fills_missing_embarked(self):
        """Test that missing embarkation is filled with S"""
        df = pd.DataFrame([{
            "Name": "Smith, Mr. John",
            "Sex": "male",
            "Age": 30,
            "Embarked": None
        }])
        
        result = preprocess(df)
        assert not result["Embarked"].isna().any()
    
    def test_preprocess_creates_dummy_variables(self):
        """Test that categorical variables are one-hot encoded"""
        df = pd.DataFrame([{
            "Name": "Smith, Mr. John",
            "Sex": "male",
            "Age": 30,
            "Embarked": "S"
        }])
        
        result = preprocess(df)
        assert "Sex_male" in result.columns
        assert "Embarked_S" in result.columns
        assert "Embarked_Q" in result.columns


class TestInference:
    """Test suite for model inference"""
    
    def test_predict_single_returns_dict(self):
        """Test that prediction returns a dictionary"""
        passenger = {
            "Pclass": 1,
            "Name": "Smith, Mr. John",
            "Sex": "male",
            "Age": 30,
            "SibSp": 0,
            "Parch": 0,
            "Fare": 50.0,
            "Embarked": "S"
        }
        
        result = predict_single(passenger)
        assert isinstance(result, dict)
        assert "survived" in result
        assert "predicted_value" in result
    
    def test_predict_single_survival_is_binary(self):
        """Test that survival prediction is 0 or 1"""
        passenger = {
            "Pclass": 1,
            "Name": "Test, Mrs. Jane",
            "Sex": "female",
            "Age": 25,
            "SibSp": 0,
            "Parch": 0,
            "Fare": 80.0,
            "Embarked": "C"
        }
        
        result = predict_single(passenger)
        assert result["survived"] in [0, 1]
    
    def test_predict_single_value_is_float(self):
        """Test that predicted value is a float"""
        passenger = {
            "Pclass": 2,
            "Name": "Test, Mr. Bob",
            "Sex": "male",
            "Age": 40,
            "SibSp": 1,
            "Parch": 0,
            "Fare": 30.0,
            "Embarked": "S"
        }
        
        result = predict_single(passenger)
        assert isinstance(result["predicted_value"], float)
