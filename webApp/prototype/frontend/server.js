const express = require("express");
const path = require("path");

const HOST = "localhost";
const PORT = 3000;
const CLIENT_PATH = "client";

const server = express();
server.listen(PORT, () => console.log("listening..."))
server.use(express.static(path.join(__dirname, CLIENT_PATH)));