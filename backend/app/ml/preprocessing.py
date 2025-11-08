import pandas as pd

def preprocess(df: pd.DataFrame) -> pd.DataFrame:
    # Same preprocessing as training
    df['Title'] = df['Name'].str.extract(r',\s*([^\.]+)\.')
    df['Title'] = df['Title'].replace(['Mlle','Ms'],'Miss').replace('Mme','Mrs')
    df['Age'] = df['Age'].fillna(df['Age'].median())
    df['Embarked'] = df['Embarked'].fillna('S')

    # One-hot encode
    df = pd.get_dummies(df, columns=['Sex','Embarked','Title'], drop_first=True)

    # Ensure all expected columns exist
    expected_cols = ['Sex_male','Embarked_Q','Embarked_S','Title_Mr','Title_Mrs','Title_Miss']
    for col in expected_cols:
        if col not in df.columns:
            df[col] = 0

    return df
