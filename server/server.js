const express = require("express");
const path = require("path");
const winston = require("winston");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.send("Welcum")
});

const port = 3000;
app.listen(port, () => {
    console.log("server start at port: " + port);
});
