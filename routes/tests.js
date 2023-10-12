const express = require("express");
const router = express.Router();

const {
  uploadTest,
  getTestByID,
  getTestByTestTopic,
  getTestByTestGrade,
  deleteTest,
} = require("../Controllers/tests");

router.post("/upload-test", uploadTest);
router.get("/get-test-id/:testID", getTestByID);
router.get("/get-test-topic/:topic", getTestByTestTopic);
router.get("/get-test-grade/:grade", getTestByTestGrade);
router.delete("/delete-test/:id", deleteTest);

module.exports = router;
