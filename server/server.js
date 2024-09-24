const express = require("express");
const path = require("path");
const logger = require("./modules/logger");
const app = express();
const pythonRoutes = require("./routers/pythonRoutes");

logger.error("Error message");
logger.warn("Warn message");
logger.info("Hello world");
logger.verbose("Verbose message");
logger.debug("Debugging info");
logger.silly("Very verbose silly message");

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
