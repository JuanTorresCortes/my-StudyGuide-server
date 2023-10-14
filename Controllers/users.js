const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// controller function to create new user (registration);
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, gradeLevel, password, testRecord } =
      req.body;

    //--------password plain text => bcrypt.genSalt() + bcrypt.hash() = passwordHash ------
    // Generate a random salt and hash the password using bcrypt;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create new user data
    const userInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      gradeLevel: gradeLevel,
      passwordHash: hash,
      testRecord: testRecord,
    };

    // create a new User instance and save it to the database
    const newUser = await new User(userInfo); // grab data;
    await newUser.save(); // save to database
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error", error: error });
  }
};

// Controller function for user login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user with the given email in the database
    const foundUser = await User.findOne({ email: email });

    // If user not found or password does not match, return an error response
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "User or Password does not match",
        error: { email: "User or Password does not match" }, // Send the error in an error object
      });
    }

    // bcrypt.compare(): This method takes the plain-text password and the hashed password as arguments.
    // It hashes the plain-text password using the same salt as the stored hashed password and then compares the two hashes.
    // If they match, it means the plain-text password is correct.
    const isPasswordValid = await bcrypt.compare(
      password,
      foundUser.passwordHash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "User or Password does not match",
        error: { password: "User or Password does not match" }, // Send the error in an error object
      });
    }

    // Generate a JWT token for authentication => save token to local storage @ frontend
    //----token------------------saved data----------------signature-----------
    const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET_KEY, {
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
