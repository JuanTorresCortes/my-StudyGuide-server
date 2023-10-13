const { isEmail, isStrongPassword, isEmpty } = require("validator"); // validation functions from the 'validator' library

const validateUserData = (req, res, next) => {
  const { email, password } = req.body; // Destructure email and password from the request body

  const errorObject = {}; // Object to store validation errors

  // Validate email (required, must be a valid email address)
  if (isEmpty(email)) {
    errorObject.email = "Email is required";
  } else if (!isEmail(email)) {
    errorObject.email = "Please enter a valid email";
  }

  // -----------isStrongPassword-----------
  // check if the string can be considered a strong password or not.
  // Allows for custom requirements or scoring rules.
  // If returnScore is true, then the function returns an integer score for the password rather than a boolean.
  // Default options:
  // { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }

  // Validate password (required, strong password with specific criteria)
  if (isEmpty(password)) {
    errorObject.password = "Password is required";
  } else if (!isStrongPassword(password)) {
    errorObject.password =
      "Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character, and be at least 8 characters long";
  }

  //Object.keys takes all the key and puts it in an array
  if (Object.keys(errorObject).length > 0) {
    return res.status(401).json({
      success: false,
      message: "Validation Error",
      error: errorObject,
    });
  } else {
    next(); // If there are no validation errors, proceed to the next middleware
  }
};

module.exports = { validateUserData };
