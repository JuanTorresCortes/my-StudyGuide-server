const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  uploadTest,
  getTestByID,
  getTestByTestTopic,
  getTestByTestGrade,
  deleteTest,
} = require("../Controllers/testController");

// multer middle wear
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("pdf"); /// .single("pdf") must mach front end formData property name ex: formData.append("pdf", pdf);

router.post("/upload-test", upload, uploadTest);
router.get("/get-test-id/:testID", getTestByID);
router.get("/get-test-topic/:topic", getTestByTestTopic);
router.get("/get-test-grade/:grade", getTestByTestGrade);
router.delete("/delete-test/:id", deleteTest);

module.exports = router;
