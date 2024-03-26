import { loadPLY } from "./renderer.js";

const backButton = document.querySelector(".back-btn");

const plyFilePath = '/static/models/skull.ply'; // Example path

backButton.addEventListener("click", () =>
{
    location.href = "./upload.html";
})

/*
async function getPLY(endpoint) {
    const res = await fetch(endpoint);
    const blob = await res.blob();
    const blobURL = URL.createObjectURL(blob);
    ////
}
*/

loadPLY(plyFilePath);

// Test path 
//getPLY("http://localhost:3000/view");