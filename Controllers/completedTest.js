const User = require("../Model/User");

// Add a completed test to a user's test record
const addTestCompleted = async (req, res) => {
  try {
    const userId = req.params.id;
    const completedTest = req.body;

    // Find the user by ID and push the completed test to the testRecord array
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { testRecord: completedTest } },
      { new: true } // this ensures the updated document is returned
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, updatedUser: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve a user's completed tests
const getTestCompleted = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId, "testRecord"); // only fetch the testRecord field

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, completedTests: user.testRecord });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a specific completed test from a user's test record
const deleteCompletedTest = async (req, res) => {
  try {
    const userId = req.params.userId;
    const testId = req.params.testId; // assuming test ID is passed as a URL parameter

    // Find the user and pull (remove) the completed test from the testRecord array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { testRecord: { _id: testId } } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User or test not found" });
    }

    res.status(200).json({ success: true, updatedUser: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addTestCompleted,
  getTestCompleted,
  deleteCompletedTest,
};
