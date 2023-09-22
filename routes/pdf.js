const express = require("express");
const router = express.Router();
const pdfController = require("../Controllers/pdf");

router.post("/upload", pdfController.uploadPdf);
router.get("/retrieve/:pdfId", pdfController.retrievePdf);

module.exports = router;
