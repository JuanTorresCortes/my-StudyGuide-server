const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// controller function to create new user (registration);
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, gradeLevel, password, testRecord } =
      req.body;

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

    //create a new User instance and save it to the database
    const newUser = await new User(userInfo); // grab data;
    await newUser.save(); // save to database
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error", error: error });
  }
};
