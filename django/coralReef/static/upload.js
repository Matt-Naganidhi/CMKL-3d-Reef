
//version2
const preview = document.querySelector("#preview");
const dropArea = document.querySelector("#drop-area");
const selectButton = dropArea.querySelector("button");
const uploadButton = document.querySelector("#submit");
const input = dropArea.querySelector("input");

// Handle file selection and update the preview
function updatePreview(files) {
    preview.innerHTML = ""; // Clear existing content

    Array.from(files).forEach(file => {
        const fileElement = file.type.startsWith("image/") ? document.createElement("img") : document.createElement("video");
        fileElement.src = URL.createObjectURL(file);
        fileElement.onload = () => URL.revokeObjectURL(fileElement.src); // Free up memory
        if (fileElement.tagName === "VIDEO") fileElement.controls = true;
        preview.appendChild(fileElement);
    });
}

//Make sure the file input is only triggered once when the select button is clicked
selectButton.onclick = (event) => {
    input.click();
    event.preventDefault(); // Prevent any default action
};

input.addEventListener("change", (event) => {
    if (event.target.files.length > 0) {
        updatePreview(event.target.files);
    }
});

uploadButton.addEventListener("click", () => {
    if (input.files.length === 0) {
        console.log("No file selected to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("file", input.files[0]); // Ensure the key matches your server's expected field for file upload

    fetch('https://httpbin.org/post', { method: "POST", body: formData })
        .then(response => response.json())
        .then(data => console.log("Upload successful:", data))
        .catch(error => console.log("Upload error:", error));
});


/* 
version 1
const preview = document.querySelector("#preview");
const dropArea = document.querySelector("#drop-area");
const selectButton = dropArea.querySelector("button");
const uploadButton = document.querySelector("#submit");
const input = dropArea.querySelector("input");

selectButton.addEventListener("click", () => 
{
    input.click();
});

uploadButton.addEventListener("click", () =>
{
    const endpoint = "https://httpbin.org/post"
    const formData = new FormData();
    formData.append("input", input.files[0]);
    fetch(endpoint, {method: "post", body: formData})
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
});

input.addEventListener("change", e =>
{
    const files = e.target.files;
    preview.innerHTML = ""; 

    Array.from(files).forEach(file => 
    {
        if (file.type.startsWith("image/")) 
        {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.onload = () => URL.revokeObjectURL(img.src); // Free memory
            preview.appendChild(img);
        } 
        else if (file.type.startsWith("video/")) 
        {
            const video = document.createElement("video");
            video.src = URL.createObjectURL(file);
            video.controls = true;
            video.onload = () => URL.revokeObjectURL(video.src); // Free memory
            preview.appendChild(video);
        }
    });
});
*/