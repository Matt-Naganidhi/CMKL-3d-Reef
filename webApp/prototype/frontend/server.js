const express = require("express");
const path = require("path");

const HOST = "localhost";
const PORT = 3000;
const CLIENT_PATH = path.join(__dirname, "client");

const server = express();
server.listen(PORT, () => console.log("listening..."))
server.use(express.static(CLIENT_PATH));

server.get("/", (req, res) => {
    res.sendFile(path.join(CLIENT_PATH, "upload.html"));
});

server.get("/view", (req, res) =>{
    res.sendFile(filePath, path.join(__dirname, "goat_skull_ply_1", "Goat skull.ply"));
    res.on("error", err => console.log(err));
});