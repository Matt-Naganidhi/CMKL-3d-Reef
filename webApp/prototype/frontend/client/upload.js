
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