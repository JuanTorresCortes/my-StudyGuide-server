const jwt = require("jsonwebtoken"); // JSON Web Token library

const jwtValidate = async (req, res, next) => {
  try {
    console.log(req.headers); // Log the request headers for debugging purposes

    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization; // Get the authorization header value
      const slicedToken = token.split(" ")[1]; // Extract the token part by removing the "Bearer " prefix
      const decodedToken = await jwt.verify(
        slicedToken,
        process.env.SECRET_KEY
      ); // Verify and decode the JWT token using the secret key
      // decodedTOken = payload (any info we passed in ), created time and time and expiration time

      if (decodedToken) {
        res.locals.decodedToken = decodedToken; // Store the decoded token in res.locals for future use in other middleware
        next(); // Proceed to the next middleware
        return;
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "error",
        error: { user: "Not authorized" },
      });
    }
  } catch (error) {
    console.log(error); // Log any errors that occur during the token verification process

    res.status(401).json({ success: false, message: "Error", error: error }); // Return a 401 Unauthorized status with the error information
  }
};

module.exports = {
  jwtValidate,
};
