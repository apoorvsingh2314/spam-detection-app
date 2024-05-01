import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib

# Load the emotions dataset
df = pd.read_csv('text.csv')

# Separate features (X) and target variable (Y)
X = df['text']
Y = df['label']

# Split the dataset into training and testing sets
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

# Feature extraction using TF-IDF Vectorizer
tfidf_vectorizer = TfidfVectorizer(min_df=1, stop_words='english', lowercase=True)
X_train_features = tfidf_vectorizer.fit_transform(X_train)
X_test_features = tfidf_vectorizer.transform(X_test)

# Train the logistic regression model
model = LogisticRegression()
model.fit(X_train_features, Y_train)

# Save the trained model and tokenizer
joblib.dump(model, 'text_regression_model.joblib')
joblib.dump(tfidf_vectorizer, 'tokenizer.joblib')
