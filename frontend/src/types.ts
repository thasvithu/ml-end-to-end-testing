// src/types.ts

export interface Passenger {
  Pclass: number;
  Name: string;
  Sex: string;
  Age: number;
  SibSp: number;
  Parch: number;
  Fare: number;
  Embarked: string;
}

export interface Prediction {
  survived: number;
  predicted_value: number;
}
