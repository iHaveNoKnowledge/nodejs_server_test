const express = require("express");
const path = require("path");
const winston = require("winston");
const app = express();
const pythonRoutes = require("./routers/pythonRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/", (req, res, next) => {
//   res.send("Welcome");
// });
app.use("/api/python", pythonRoutes);

const port = 3000;
app.listen(port, () => {
  console.log("server start at port: " + port);
});
  