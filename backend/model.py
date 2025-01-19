from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import os
import imghdr  # To check the image type
import pydicom  # To check if the file is a valid DICOM file (for X-rays)

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)  # This will allow all domains; you can customize as needed.

# Path to your model file
MODEL_PATH = './models/lung_cancer_model.h5'

# Load the model when the app starts
try:
    model = load_model(MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    model = None

# Preprocess the image for model input
def preprocess_image(image):
    try:
        image = image.resize((150, 150))  # Adjust to match model input size
        image_array = np.array(image)
        image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
        image_array = image_array / 255.0  # Normalize if needed
        return image_array
    except Exception as e:
        print(f"Error during image preprocessing: {str(e)}")
        return None

# Check if the file is a valid X-ray image (either a supported image or DICOM)
def is_xray_image(file):
    try:
        # Check if it's an image using imghdr
        image_type = imghdr.what(file)
        if image_type in ['jpeg', 'png']:  # Accepting common formats for images
            return True
        
        # Check if it's a valid DICOM file
        try:
            pydicom.dcmread(file)  # Try reading the file as DICOM
            return True
        except:
            return False

    except Exception as e:
        print(f"Error during file validation: {str(e)}")
        return False

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        # Check if a file is part of the request
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Check if the file is a valid X-ray image
        if not is_xray_image(file):
            return jsonify({'error': 'Invalid file type. Please upload a valid X-ray image (JPEG, PNG, or DICOM).'}), 400
        
        # Save the file temporarily
        filename = os.path.join('./uploads', file.filename)
        file.save(filename)
        
        # Open and preprocess the image
        image = Image.open(filename)
        image_array = preprocess_image(image)
        if image_array is None:
            return jsonify({'error': 'Image preprocessing failed'}), 400
        
        # Predict using the model
        if model is None:
            return jsonify({'error': 'Model is not loaded'}), 500
        
        prediction = model.predict(image_array)
        
        # Assuming the model has 3 output classes (Benign, Malignant, Normal)
        class_names = ['Benign', 'Malignant', 'Normal']
        predicted_class_idx = np.argmax(prediction)  # Get index of the highest probability
        predicted_class = class_names[predicted_class_idx]
        probability = float(prediction[0][predicted_class_idx])  # Convert to native Python float
        
        return jsonify({'prediction': predicted_class, 'probability': probability}), 200
    
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({'error': 'Error during prediction'}), 500


if __name__ == '__main__':
    # # Ensure uploads folder exists
    # if not os.path.exists('./uploads'):
    #     os.makedirs('./uploads')
    app.run(debug=True, host='0.0.0.0', port=5000)  # Set port to 5000
