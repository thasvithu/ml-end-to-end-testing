import { useState } from "react";
import { Passenger, Prediction } from "@/types";

export default function Home() {
  const [formData, setFormData] = useState<Passenger>({
    Pclass: 3,
    Name: "",
    Sex: "male",
    Age: 30,
    SibSp: 0,
    Parch: 0,
    Fare: 20,
    Embarked: "S",
  });

  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("http://localhost:8000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const data: Prediction = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "Pclass" ||
        name === "Age" ||
        name === "SibSp" ||
        name === "Parch" ||
        name === "Fare"
          ? parseFloat(value)
          : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🚢</div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Titanic Survival Predictor
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Powered by Machine Learning
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Passenger Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Smith, Mr. John"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Passenger Class and Sex */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Class
                  </label>
                  <select
                    name="Pclass"
                    value={formData.Pclass}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value={1}>1st Class</option>
                    <option value={2}>2nd Class</option>
                    <option value={3}>3rd Class</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sex
                  </label>
                  <select
                    name="Sex"
                    value={formData.Sex}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* Age and Fare */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="Age"
                    value={formData.Age}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fare (£)
                  </label>
                  <input
                    type="number"
                    name="Fare"
                    value={formData.Fare}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Family Members */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Siblings/Spouses
                  </label>
                  <input
                    type="number"
                    name="SibSp"
                    value={formData.SibSp}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Parents/Children
                  </label>
                  <input
                    type="number"
                    name="Parch"
                    value={formData.Parch}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Embarked */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Port of Embarkation
                </label>
                <select
                  name="Embarked"
                  value={formData.Embarked}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="C">Cherbourg</option>
                  <option value="Q">Queenstown</option>
                  <option value="S">Southampton</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Predicting...
                  </span>
                ) : (
                  "Predict Survival"
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Prediction Result */}
            {prediction && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-fadeIn">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  Prediction Result
                </h2>
                <div className="space-y-6">
                  {/* Survival Status */}
                  <div
                    className={`p-6 rounded-xl ${
                      prediction.survived === 1
                        ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500"
                        : "bg-red-100 dark:bg-red-900/30 border-2 border-red-500"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">
                        {prediction.survived === 1 ? "✅" : "❌"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Survival Prediction
                        </p>
                        <p
                          className={`text-3xl font-bold ${
                            prediction.survived === 1
                              ? "text-green-700 dark:text-green-400"
                              : "text-red-700 dark:text-red-400"
                          }`}
                        >
                          {prediction.survived === 1 ? "Survived" : "Did Not Survive"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Score */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Model Confidence
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-4 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            prediction.survived === 1
                              ? "bg-gradient-to-r from-green-500 to-green-600"
                              : "bg-gradient-to-r from-red-500 to-red-600"
                          }`}
                          style={{
                            width: `${Math.abs(prediction.predicted_value) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-2xl font-bold text-gray-800 dark:text-white">
                        {(Math.abs(prediction.predicted_value) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>ℹ️ Note:</strong> This prediction is based on historical
                      Titanic data and machine learning analysis. The model considers
                      factors like passenger class, age, sex, family size, and fare.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-500 rounded-2xl p-6 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h3 className="font-bold text-red-800 dark:text-red-300 mb-1">
                      Error
                    </h3>
                    <p className="text-red-700 dark:text-red-400">{error}</p>
                    <p className="text-sm text-red-600 dark:text-red-500 mt-2">
                      Make sure the backend server is running on http://localhost:8000
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Info Card */}
            {!prediction && !error && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  About This Predictor
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    This machine learning model predicts the likelihood of survival for
                    Titanic passengers based on historical data.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      Key Factors:
                    </h3>
                    <ul className="space-y-1 pl-5 list-disc">
                      <li>Passenger class and ticket fare</li>
                      <li>Age and gender</li>
                      <li>Family size aboard</li>
                      <li>Port of embarkation</li>
                    </ul>
                  </div>
                  <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <p className="text-sm text-indigo-800 dark:text-indigo-300">
                      💡 <strong>Tip:</strong> Fill in the passenger details and click
                      "Predict Survival" to see the model's prediction.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Built with Next.js, FastAPI, and Machine Learning | © 2025 Titanic
            Survival Predictor
          </p>
        </div>
      </footer>
    </div>
  );
}
