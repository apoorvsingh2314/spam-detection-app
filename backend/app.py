from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib
import os

app = Flask(__name__)
CORS(app)

# Define the base directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load the TF-IDF vectorizer and trained model for spam detection
spam_model_path = os.path.join(BASE_DIR, 'spam_check', 'spam_detection_model.joblib')
spam_model = joblib.load(spam_model_path)
spam_tfidf_path = os.path.join(BASE_DIR, 'spam_check', 'tfidf_vectorizer.joblib')
spam_tfidf_vectorizer = joblib.load(spam_tfidf_path)

# Load the TF-IDF vectorizer and trained model for text analysis
text_model_path = os.path.join(BASE_DIR, 'text_analyser', 'text_regression_model.joblib')
text_model = joblib.load(text_model_path)
text_tfidf_path = os.path.join(BASE_DIR, 'text_analyser', 'tokenizer.joblib')
text_tfidf_vectorizer = joblib.load(text_tfidf_path)

@app.route('/check-spam', methods=['POST'])
def check_spam():
    data = request.get_json()
    email_text = data['email']
    input_email_features = spam_tfidf_vectorizer.transform([email_text])
    prediction = spam_model.predict(input_email_features)
    result = 'Safe Email' if prediction[0] == 1 else 'Phishing Email'
    return jsonify({'result': result})

@app.route('/predict-emotion', methods=['POST'])
def predict_emotion():
    data = request.json
    text = data.get('text', '')

    # Transform the input text using the TF-IDF vectorizer
    text_features = text_tfidf_vectorizer.transform([text])

    # Predict the emotion
    predicted_emotion = text_model.predict(text_features)[0]

    # Convert predicted_emotion to a JSON serializable type
    predicted_emotion_str = str(predicted_emotion)

    return jsonify({'predicted_emotion': predicted_emotion_str})

if __name__ == '__main__':
    app.run(debug=True)
