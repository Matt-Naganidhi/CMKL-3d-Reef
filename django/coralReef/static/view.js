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
                const fullPath = `${window.location.origin}/${data.file_path}`;
                console.log("Loading .ply file from:", fullPath);
                loadPLY(fullPath); // Use the function from renderer.js to load the .ply file
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

/*
The following async function 'getPLY' was considered for directly fetching .ply files from a specified endpoint.
It demonstrates fetching a blob from an endpoint and converting it to a blob URL, but it's not used in the final implementation.
This is left here for future reference or potential use.

async function getPLY(endpoint) {
    const res = await fetch(endpoint);
    const blob = await res.blob();
    const blobURL = URL.createObjectURL(blob);
    // Further actions to use the blobURL could be implemented here
}
*/

// The following lines are part of the original setup for direct loading of a specific .ply file
// const plyFilePath = '/static/models/skull.ply'; // This was an example path for directly loading a specific .ply file
// loadPLY(plyFilePath); // This directly loads a .ply file based on the specified path

// The line to test fetching a .ply file from a specific endpoint, now commented out
// getPLY("http://localhost:3000/view"); // This was a test path for a previously considered method to load .ply files
