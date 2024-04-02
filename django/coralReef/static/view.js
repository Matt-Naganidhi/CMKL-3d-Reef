import { loadPLY } from "./renderer.js";

console.log("view.js loaded");

// Add the event listener for the back button to navigate to the upload page
const backButton = document.querySelector(".back-btn");
backButton.addEventListener("click", () => {
    location.href = "./upload.html"; // Navigate back to the upload page
});

// Function to fetch the most recent .ply file path from the server and load it
function fetchMostRecentPlyFile() {
    console.log("Fetching the most recent .ply file");
    fetch('/myapp/get-most-recent-ply/') // Adjust this to match the URL configured in Django urls.py
        .then(response => {
            console.log("Received response from server", response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // fullPath is correctly scoped for access by the export button's event listener
                const fullPath = `${window.location.origin}/${data.file_path}`;
                console.log("Loading .ply file from:", fullPath);
                loadPLY(fullPath); // Use the function from renderer.js to load the .ply file
                
                // Setup export button to use the fullPath
                const exportBtn = document.getElementById('exportBtn');
                exportBtn.addEventListener('click', function() {
                    // Assuming fullPath is the full URL to the .ply file
                    const filename = fullPath.split('/').pop(); // Extracts the filename from the URL
                    downloadFile(fullPath, filename);
                });
            } else {
                console.error(data.error); // Log any errors from the server
            }
        })
        .catch(error => {
            console.error('Error fetching the most recent .ply file:', error);
        });
}

// Call fetchMostRecentPlyFile when the document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("Document fully loaded. Initiating fetch for most recent .ply file.");
    fetchMostRecentPlyFile();
});

function downloadFile(dataUrl, filename) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
