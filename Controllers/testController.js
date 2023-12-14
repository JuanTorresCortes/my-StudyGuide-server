const Test = require("../Model/Test");

const uploadTest = async (req, res) => {
  // Check for required fields in request body
  if (!req.body.testTopic || !req.body.grade || !req.body.testKey) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required test fields." });
  }

  try {
    console.log("File received:", req.file); // Add this line to log the file object

    const testData = {
      testTopic: req.body.testTopic,
      grade: req.body.grade,
      testKey: req.body.testKey,
      pdfData: req.file.buffer,
    };

    const newTest = new Test(testData);
    const savedTest = await newTest.save();

    res.status(200).json({ success: true, data: savedTest });
  } catch (error) {
    console.error("Error in uploadTest:", error);
    return res.status(500).send("An error occurred while uploading the test.");
    // res.status(400).json({ success: false, message: "error", error: error });
  }
};

const getTestByID = async (req, res) => {
  try {
    const testDocument = await Test.findById(req.params.testID);
    if (!testDocument) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'inline; filename="' + testDocument.testTopic + '.pdf"'
    );
    res.send(testDocument.pdfData);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving TEST." });
  }
};

const getTestByTestTopic = async (req, res) => {
  try {
    // Retrieve tests using the provided topic from req.params
    const tests = await Test.find({ testTopic: req.params.topic });

    // If no tests are found, send an appropriate response
    if (tests.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tests found for the provided topic.",
      });
    }

    // Return the found tests in the response
    res.status(200).json({ success: true, data: tests });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving tests by topic." });
  }
};

const getTestByTestGrade = async (req, res) => {
  try {
    // Retrieve tests using the provided grade from req.params
    const tests = await Test.find({ testGrade: req.params.grade });

    // If no tests are found, send an appropriate response
    if (tests.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tests found for the provided grade.",
      });
    }

    // Return the found tests in the response
    res.status(200).json({ success: true, data: tests });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving tests by grade." });
  }
};

const deleteTest = async (req, res) => {
  try {
    // Retrieve the test using the provided ID
    const testDocument = await Test.findById(req.params.id);

    // If test is not found, send an appropriate error response
    if (!testDocument) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found." });
    }

    // Delete the corresponding test key using the testKeyID from the test
    await TestKey.findByIdAndDelete(testDocument.testKeyID);

    // Delete the test
    await Test.findByIdAndDelete(req.params.id);

    // Return success message in the response
    res.status(200).json({
      success: true,
      message: "Test and corresponding key deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting test." });
  }
};

module.exports = {
  uploadTest,
  getTestByID,
  getTestByTestTopic,
  getTestByTestGrade,
  deleteTest,
};
