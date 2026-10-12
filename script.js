const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const fileName = document.getElementById("fileName");
const analyzeBtn = document.getElementById("analyzeBtn");

const loading = document.getElementById("loading");
const result = document.getElementById("result");

let selectedImage = null;
let previewURL = null;


// ===============================
// IMAGE SELECTION
// ===============================

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        return;
    }

    // Check image type
    if (!file.type.startsWith("image/")) {
        alert("Please select a valid image.");
        imageInput.value = "";
        return;
    }

    // Check file size - 20 MB
    if (file.size > 20 * 1024 * 1024) {
        alert("Image size must be less than 20 MB.");
        imageInput.value = "";
        return;
    }

    selectedImage = file;

    // Show file name
    fileName.textContent = "Selected: " + file.name;


    // ===============================
    // SHOW IMAGE PREVIEW
    // ===============================

    if (previewURL) {
        URL.revokeObjectURL(previewURL);
    }

    previewURL = URL.createObjectURL(file);

    imagePreview.src = previewURL;

    imagePreview.style.display = "block";
    imagePreview.style.visibility = "visible";


    // Enable Analyze button
    analyzeBtn.disabled = false;

    // Hide previous result
    result.style.display = "none";
});


// ===============================
// ANALYZE IMAGE
// ===============================

analyzeBtn.addEventListener("click", async function () {

    if (!selectedImage) {
        alert("Please select an image first.");
        return;
    }

    // Show loading
    loading.style.display = "block";

    // Hide old result
    result.style.display = "none";

    // Disable button
    analyzeBtn.disabled = true;


    // Create FormData
    const formData = new FormData();

    formData.append("image", selectedImage);


    try {

        const response = await fetch(
            "http://127.0.0.1:5000/analyze",
            {
                method: "POST",
                body: formData
            }
        );


        if (!response.ok) {
            throw new Error(
                "Server error: " + response.status
            );
        }


        const data = await response.json();


        // ==========================================
        // ACTUAL AI RESULT
        // ==========================================

        const detectionStatus =
            data.detection || "UNKNOWN";

        const confidence =
            data.confidence || "Not available";


        // Detection Status
        document.getElementById("status").textContent =
            detectionStatus;


        // Confidence
        document.getElementById("confidence").textContent =
            confidence;


        // AI Analysis
        document.getElementById("objects").textContent =
            "Image classification completed";


        // AI Prediction Text
        document.getElementById("detectedText").textContent =
            data.text ||
            "AI analysis completed successfully.";


        // Show result
        result.style.display = "block";


    } catch (error) {

        console.error("Error:", error);

        alert(
            "Backend connection failed. " +
            "Please make sure the Python server is running."
        );

    }


    // Hide loading
    loading.style.display = "none";

    // Enable button
    analyzeBtn.disabled = false;

});