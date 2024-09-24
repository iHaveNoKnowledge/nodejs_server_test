const express = require("express");
const router = express.Router();
const pythonController = require("../controllers/pythonController");

// สร้างเส้นทาง api สำหรับเรียกใช้ py script
router.get("/runpy", pythonController.runPythonScript);

router.get("/py01", pythonController.py01);

router.get("/py02", pythonController.py02);

router.get("/version-check", pythonController.getVersion);

router.get("/download-new-version", pythonController.downloadNewVersion);

module.exports = router;
