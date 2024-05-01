import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib

# Load the dataset
df = pd.read_csv('Phishing_Email.csv')

# Replace missing values with empty strings
data = df.where((pd.notnull(df)), '')

# Convert the 'Email Type' column to binary values (0 for phishing, 1 for safe)
data.loc[data['Email Type'] == 'Phishing Email', 'Email Type'] = 0
data.loc[data['Email Type'] == 'Safe Email', 'Email Type'] = 1

# Separate features (X) and target variable (Y)
X = data['Email Text']
Y = data['Email Type']

# Feature extraction using TF-IDF Vectorizer
tfidf_vectorizer = TfidfVectorizer(min_df=1, stop_words='english', lowercase=True)
X_features = tfidf_vectorizer.fit_transform(X)

# Convert target variables to integers
Y = Y.astype('int')

# Train the logistic regression model
model = LogisticRegression()
model.fit(X_features, Y)

# Save the trained model and TF-IDF vectorizer
joblib.dump(tfidf_vectorizer, 'tfidf_vectorizer.joblib')
joblib.dump(model, 'spam_detection_model.joblib')
