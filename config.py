from pathlib import Path

# Project root directory
PROJECT_ROOT = Path(__file__).parent.resolve()

# Data paths
RAW_DATA = PROJECT_ROOT / "ml_pipeline/data/raw/train.csv"

# Model path
MODEL_PATH = PROJECT_ROOT / "backend/app/ml/model.joblib"