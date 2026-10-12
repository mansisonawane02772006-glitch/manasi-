from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PIL import Image
from transformers import pipeline
import os
import uuid

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}

MODEL_NAME = "dima806/ai_vs_real_image_detection"

print("Loading AI model...")

classifier = pipeline(
    "image-classification",
    model=MODEL_NAME
)

print("AI model loaded successfully!")


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )


@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/<path:filename>")
def frontend_files(filename):
    return send_from_directory(BASE_DIR, filename)


@app.route("/analyze", methods=["POST"])
def analyze():

    if "image" not in request.files:
        return jsonify({
            "status": "error",
            "message": "No image uploaded"
        }), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({
            "status": "error",
            "message": "No image selected"
        }), 400

    if not allowed_file(file.filename):
        return jsonify({
            "status": "error",
            "message": "Only JPG, JPEG, PNG and WEBP images are allowed"
        }), 400

    filename = secure_filename(file.filename)
    unique_name = str(uuid.uuid4()) + "_" + filename
    filepath = os.path.join(UPLOAD_FOLDER, unique_name)

    file.save(filepath)

    # Check image
    try:
        img = Image.open(filepath)
        img.verify()
    except Exception:
        return jsonify({
            "status": "error",
            "message": "Invalid image file"
        }), 400

    # AI Analysis
    try:
        image = Image.open(filepath).convert("RGB")

        predictions = classifier(image)

        print("\n========== AI PREDICTION ==========")

        for prediction in predictions:
            print(
                prediction["label"],
                "=>",
                f"{prediction['score'] * 100:.2f}%"
            )

        print("===================================\n")

        real_score = 0.0
        fake_score = 0.0

        for prediction in predictions:

            label = prediction["label"].upper()

            if label == "REAL":
                real_score = prediction["score"]

            elif label == "FAKE":
                fake_score = prediction["score"]

        if fake_score > real_score:
            detection_status = "FAKE"
            confidence = fake_score * 100
        else:
            detection_status = "REAL"
            confidence = real_score * 100

        return jsonify({
            "status": "success",
            "detection": detection_status,
            "confidence": f"{confidence:.2f}%",
            "objects": "AI image classification completed",
            "text": f"REAL: {real_score * 100:.2f}% | FAKE: {fake_score * 100:.2f}%"
        })

    except Exception as e:

        print("AI ERROR:", str(e))

        return jsonify({
            "status": "error",
            "message": "AI analysis failed",
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)