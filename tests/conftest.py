"""
Test configuration and fixtures for pytest
"""
import pytest
from fastapi.testclient import TestClient
from backend.app.main import app


@pytest.fixture
def client():
    """Create a test client for the FastAPI app"""
    return TestClient(app)


@pytest.fixture
def sample_passenger():
    """Sample passenger data for testing"""
    return {
        "Pclass": 1,
        "Name": "Smith, Mr. John",
        "Sex": "male",
        "Age": 30.0,
        "SibSp": 0,
        "Parch": 0,
        "Fare": 50.0,
        "Embarked": "S"
    }


@pytest.fixture
def sample_passenger_female():
    """Sample female passenger data for testing"""
    return {
        "Pclass": 1,
        "Name": "Smith, Mrs. Jane",
        "Sex": "female",
        "Age": 25.0,
        "SibSp": 1,
        "Parch": 0,
        "Fare": 80.0,
        "Embarked": "C"
    }
