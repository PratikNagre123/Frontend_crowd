const API_URL = "https://5417-34-148-220-200.ngrok-free.app/analyze"; // replace with your real URL

function uploadVideo() {
  const fileInput = document.getElementById("videoInput");
  const output = document.getElementById("output");
  const preview = document.getElementById("preview");

  if (fileInput.files.length === 0) {
    alert("Please select a video file.");
    return;
  }

  const formData = new FormData();
  formData.append("video", fileInput.files[0]);
  formData.append("flags", "[]");

  output.textContent = "Uploading and analyzing...";

  fetch(API_URL, {
    method: "POST",
    body: formData,
  })
    .then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        output.textContent = data.log || "Processing failed.";
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      preview.src = url;
      preview.style.display = "block";
      output.innerHTML = `✅ Crowd detection completed.<br/><a href="${url}" download="processed_output.mp4">Download Video</a>`;
    })
    .catch((err) => {
      console.error(err);
      output.textContent = "Error: " + err.message;
    });
}
