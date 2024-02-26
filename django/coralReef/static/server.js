const express = require("express");

const HOST = 'localhost';
const PORT = 3000;

const server = express();
server.listen(PORT, () => console.log("listening..."))
server.use(express.static("client"));