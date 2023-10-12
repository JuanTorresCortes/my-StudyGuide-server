const TestKey = require("../Model/TestKey");

exports.uploadKey = async (req, res) => {
  try {
    // Check for required fields in request body
    if (!req.body.testKeyTopic) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    // Prepare testKey data from the request body
    const testKeyData = {
      testKeyTopic: req.body.testKeyTopic,
      key: req.body.key || [], // Default to an empty array if not provided
    };

    // Create a new testKey instance using the prepared data
    const newTestKey = await new TestKey(testKeyData);

    // Save the new TestKey to the database
    const savedTestKey = await newTestKey.save();

    res.status(200).json({ success: true, data: savedTestKey });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error uploading test key.",
      error: error,
    });
  }
};

exports.getKey = async (req, res) => {
  try {
    const testKeyId = req.params.id;
    // Retrieve the testKey using the provided ID
    const testKeyDocument = await TestKey.findById(testKeyId);

    // If testKey not found, send an appropriate error response
    if (!testKeyDocument) {
      return res
        .status(404)
        .json({ success: false, message: "Test Key not found" });
    }

    // Return the testKey data in the response
    res.status(200).json({ success: true, data: testKeyDocument });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving test key." });
  }
};

exports.deleteKey = async (req, res) => {
  try {
    // Check if the testKey exists using the provided ID
    const testKey = await TestKey.findById(req.params.id);

    // If test key is not found, send an appropriate error response
    if (!testKey) {
      return res
        .status(404)
        .json({ success: false, message: "TestKey not found." });
    }

    // Delete the test key
    await TestKey.findByIdAndDelete(req.params.id);

    // Return success message in the response
    res.status(200).json({
      success: true,
      message: "TestKey deleted successfully.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting testKey." });
  }
};
