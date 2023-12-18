const User = require("../Model/User");
const Test = require("../Model/Test");
const Admin = require("../Model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isEmpty } = require("validator");

//controller function to create new admin (registration);
const registerAdmin = async (req, res) => {
  let errorObject = {};
  try {
    const { firstName, lastName, email, password, key } = req.body;

    if (isEmpty(firstName)) errorObject.firstName = "First name is required";
    if (isEmpty(lastName)) errorObject.lastName = "Last name is required";
    if (isEmpty(email)) errorObject.email = "Email is required";
    if (isEmpty(password)) errorObject.password = "Password is required";
    if (isEmpty(key)) errorObject.key = "Key is required";

    if (key !== process.env.ADMIN_KEY) {
      return res.status(401).json({
        success: false,
        message: "User not authorized",
        error: { key: "not authorized" }, // Send the error in an error object
      });
    }

    //--------password plain text => bcrypt.genSalt() + bcrypt.hash() = passwordHash ------
    // Generate a random salt and hash the password using bcrypt;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create new user data
    const adminInfo = {
      userName: `${firstName} ${lastName}`,
      email: email,
      passwordHash: hash,
    };

    // create a new Admin instance and save it to the database
    const newAdmin = new Admin(adminInfo); // grab data;
    await newAdmin.save(); // save to database
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      // Duplicate email error
      errorObject.email = "email is already in use";
    }

    if (Object.keys(errorObject).length > 0) {
      return res.status(401).json({
        success: false,
        message: "Controller Error",
        error: errorObject,
      });
    }
  }
};

// Controller function for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password, key } = req.body;

    if (key !== process.env.ADMIN_KEY) {
      return res.status(401).json({
        success: false,
        message: "Email, Password or Key does not match",
        error: { key: "Email, Password or Key does not match" }, // Send the error in an error object
      });
    }

    // Find the Admin with the given email in the database
    const foundAdmin = await Admin.findOne({ email: email });

    // If user not found or password does not match, return an error response
    if (!foundAdmin) {
      return res.status(401).json({
        success: false,
        message: "Email, Password or Key does not match",
        error: { email: "Email, Password or Key does not match" }, // Send the error in an error object
      });
    }

    // bcrypt.compare(): This method takes the plain-text password and the hashed password as arguments.
    // It hashes the plain-text password using the same salt as the stored hashed password and then compares the two hashes.
    // If they match, it means the plain-text password is correct.
    const isPasswordValid = await bcrypt.compare(
      password,
      foundAdmin.passwordHash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email, Password or Key does not match",
        error: { password: "Email, Password or Key does not match" }, // Send the error in an error object
      });
    }

    // Generate a JWT token for authentication => save token to local storage @ frontend
    //----token------------------saved data----------------signature-----------
    const token = jwt.sign({ userId: foundAdmin._id }, process.env.SECRET_KEY, {
      //--time expiration--
      expiresIn: "1hr",
    });

    res.status(200).json({ success: true, token: token });
  } catch (error) {
    console.log(error.message);

    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
};

// Controller function for validating user with JWT
const validateUser = async (req, res) => {
  try {
    const decodedToken = res.locals.decodedToken;
    // Find the user in the database using the decoded user ID from the JWT
    const findUser = await Admin.findOne({ _id: decodedToken.userId });

    if (!findUser) {
      res.status(401).json({
        success: false,
        message: "error",
        error: { user: "User not found" },
      });
    }

    res.status(200).json({
      success: true,
      _id: findUser._id,
      name: findUser.userName,
      email: findUser.email,
      role: findUser.role,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "error", error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({ success: true, data: allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllTests = async (req, res) => {
  try {
    const allTests = await Test.find({}).select(
      "_id testTopic grade createdAt testKey"
    );
    res.status(200).json({ success: true, data: allTests });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a user by its ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the user's ID from the request parameters

    // Wait for the database to delete the user by its ID
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return a success message
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a user by its ID
const deleteTest = async (req, res) => {
  try {
    const testId = req.params.testId; // Get the Test's ID from the request parameters

    // Wait for the database to delete the user by its ID
    const test = await Test.findByIdAndDelete(testId);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    // Return a success message
    res.status(200).json({
      success: true,
      message: "Test deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const editTest = async (req, res) => {
  try {
    const { testId } = req.params; // URL parameter
    const testUpdates = req.body; // The updated test data

    // Find the test by its ID and update it
    // The `{ new: true }` option returns the updated document
    const updatedTest = await Test.findByIdAndUpdate(testId, testUpdates, {
      new: true,
    });

    if (!updatedTest) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    // Return a success response with the updated test
    res.status(200).json({
      success: true,
      message: "Test updated successfully",
      data: updatedTest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getTestByGradeSub = async (req, res) => {
  try {
    const { grade, subject } = req.query; // Extracting query parameters

    // Query the database for tests matching the grade and subject
    const tests = await Test.find({ grade: grade, testTopic: subject });

    // Check if tests are found
    if (tests.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tests found",
      });
    }

    // Return the found tests
    res.status(200).json({
      success: true,
      data: tests,
    });
  } catch (error) {
    console.error("Error retrieving tests by grade and subject:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  validateUser,
  getAllUsers,
  getAllTests,
  deleteUser,
  deleteTest,
  editTest,
  getTestByGradeSub,
};
