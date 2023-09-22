const multer = require("multer");
const Test = require("../Model/Test");

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage }).single("pdf");

exports.uploadPdf = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send("Error uploading PDF.");
    }
    try {
      const newPdf = new Test({
        name: req.file.originalname,
        pdfData: req.file.buffer,
      });
      await newPdf.save();
      res.status(200).send("PDF uploaded and saved.");
    } catch (error) {
      res.status(400).send("Error saving PDF to the database.");
    }
  });
};

exports.retrievePdf = async (req, res) => {
  try {
    const pdfDocument = await Test.findById(req.params.pdfId);
    if (!pdfDocument) {
      return res.status(404).send("PDF not found.");
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'inline; filename="' + pdfDocument.name + '"'
    );
    res.send(pdfDocument.pdfData);
  } catch (error) {
    res.status(500).send("Error retrieving PDF.");
  }
};
