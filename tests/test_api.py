"""
Test cases for the prediction API
"""
import pytest


class TestPredictAPI:
    """Test suite for the prediction endpoint"""
    
    def test_predict_endpoint_exists(self, client):
        """Test that the predict endpoint is accessible"""
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
    
    def test_predict_returns_correct_format(self, client, sample_passenger):
        """Test that prediction returns the expected format"""
        response = client.post("/api/predict", json=sample_passenger)
        data = response.json()
        
        assert "survived" in data
        assert "predicted_value" in data
        assert isinstance(data["survived"], int)
        assert data["survived"] in [0, 1]
    
    def test_predict_male_passenger(self, client, sample_passenger):
        """Test prediction for male passenger"""
        response = client.post("/api/predict", json=sample_passenger)
        assert response.status_code == 200
        data = response.json()
        assert "survived" in data
    
    def test_predict_female_passenger(self, client, sample_passenger_female):
        """Test prediction for female passenger"""
        response = client.post("/api/predict", json=sample_passenger_female)
        assert response.status_code == 200
        data = response.json()
        # Female in first class should have higher survival chance
        assert "survived" in data
    
    def test_predict_with_missing_optional_fields(self, client):
        """Test prediction with missing optional fields"""
        passenger = {
            "Pclass": 3,
            "Name": "Doe, Mr. John",
            "Sex": "male",
            "SibSp": 0,
            "Parch": 0,
        }
        response = client.post("/api/predict", json=passenger)
        assert response.status_code == 200
    
    def test_predict_with_invalid_pclass(self, client):
        """Test prediction with invalid passenger class"""
        passenger = {
            "Pclass": 5,  # Invalid class
            "Name": "Test, Mr. User",
            "Sex": "male",
            "Age": 30,
            "SibSp": 0,
            "Parch": 0,
            "Fare": 50.0,
            "Embarked": "S"
        }
        response = client.post("/api/predict", json=passenger)
        # Should still process but may give unexpected results
        assert response.status_code == 200
    
    def test_predict_different_embarkation_ports(self, client):
        """Test predictions for different embarkation ports"""
        ports = ["C", "Q", "S"]
        
        for port in ports:
            passenger = {
                "Pclass": 2,
                "Name": "Test, Mrs. User",
                "Sex": "female",
                "Age": 30,
                "SibSp": 0,
                "Parch": 0,
                "Fare": 30.0,
                "Embarked": port
            }
            response = client.post("/api/predict", json=passenger)
            assert response.status_code == 200
            data = response.json()
            assert "survived" in data
    
    def test_predict_various_age_groups(self, client):
        """Test predictions for different age groups"""
        ages = [5, 20, 40, 60, 80]
        
        for age in ages:
            passenger = {
                "Pclass": 2,
                "Name": "Test, Mr. User",
                "Sex": "male",
                "Age": age,
                "SibSp": 0,
                "Parch": 0,
                "Fare": 30.0,
                "Embarked": "S"
            }
            response = client.post("/api/predict", json=passenger)
            assert response.status_code == 200
            data = response.json()
            assert isinstance(data["predicted_value"], float)
    
    def test_predict_family_size_impact(self, client):
        """Test predictions for different family sizes"""
        # Alone
        response1 = client.post("/api/predict", json={
            "Pclass": 3,
            "Name": "Alone, Mr. Solo",
            "Sex": "male",
            "Age": 30,
            "SibSp": 0,
            "Parch": 0,
            "Fare": 10.0,
            "Embarked": "S"
        })
        
        # With family
        response2 = client.post("/api/predict", json={
            "Pclass": 3,
            "Name": "Family, Mr. Dad",
            "Sex": "male",
            "Age": 30,
            "SibSp": 1,
            "Parch": 2,
            "Fare": 10.0,
            "Embarked": "S"
        })
        
        assert response1.status_code == 200
        assert response2.status_code == 200


class TestAPIHealth:
    """Test suite for API health and documentation"""
    
    def test_docs_endpoint(self, client):
        """Test that API documentation is accessible"""
        response = client.get("/docs")
        assert response.status_code == 200
    
    def test_openapi_endpoint(self, client):
        """Test that OpenAPI schema is accessible"""
        response = client.get("/openapi.json")
        assert response.status_code == 200
        data = response.json()
        assert "openapi" in data
        assert "info" in data
