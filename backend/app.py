from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import logging
import os  # Import os for checking file paths

# Set up logging for debugging and error messages
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

# Path to the model file
model_path = 'model.pkl'

# Load the trained model
model = None

# Check if model file exists and load the model
if not os.path.exists(model_path):
    logging.error(f"Model file '{model_path}' not found. Please check the file path.")
else:
    try:
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
            logging.info("Model loaded successfully.")
    except Exception as e:
        logging.error(f"Error loading model: {e}")
        raise  # Re-raise the error for further investigation
        model = None

# Root route to check if the server is running
@app.route('/')
def home():
    return "Backend is running!"

# Predict route
@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        logging.error("Model not loaded.")
        return jsonify({'error': 'Model is not loaded correctly.'}), 500

    try:
        data = request.get_json()
        logging.info(f"Received data: {data}")
    except Exception as e:
        logging.error(f"Error parsing JSON: {str(e)}")
        return jsonify({'error': f'Error parsing JSON: {str(e)}'}), 400

    # Define the required features for prediction
    required_features = ['YELLOW_FINGERS', 'ANXIETY', 'PEER_PRESSURE', 'CHRONIC_DISEASE', 
                         'FATIGUE', 'ALLERGY', 'WHEEZING', 'ALCOHOL_CONSUMING', 
                         'COUGHING', 'SWALLOWING_DIFFICULTY', 'CHEST_PAIN', 
                         'ANXYELFIN']

    missing_features = [feature for feature in required_features if feature not in data]
    if missing_features:
        logging.error(f"Missing feature(s): {', '.join(missing_features)}")
        return jsonify({'error': f'Missing feature(s): {", ".join(missing_features)}'}), 400

    features = [data[feature] for feature in required_features]

    try:
        # Making prediction
        probability = model.predict_proba([features])[0][1]
        logging.info(f"Prediction probability: {probability}")
    except Exception as e:
        logging.error(f"Error making prediction: {str(e)}")
        return jsonify({'error': f'Error making prediction: {str(e)}'}), 500

    percentage = probability * 100
    result = f'High risk: {percentage:.2f}%. Please consult with a doctor immediately' if probability >= 0.5 else f'Low risk: {percentage:.2f}%'

    return jsonify({'prediction': result})

if __name__ == '__main__':
    # Run the Flask app on all network interfaces (0.0.0.0) and set port 5002
    app.run(host='0.0.0.0', port=5002)  # Make the server accessible from other devices
