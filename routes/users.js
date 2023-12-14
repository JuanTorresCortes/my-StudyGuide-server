var express = require("express");
var router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
  validateUser,
} = require("../Controllers/users");

const { validateUserData } = require("../utils/validateUserData");
const { jwtValidate } = require("../utils/jwtValidate");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// register new user
// http://localhost:4000/users/register-user
router.post("/register-user", validateUserData, registerUser);

// login user
// http://localhost:4000/users/login-user
router.post("/login-user", validateUserData, loginUser);

router.get("/validate", jwtValidate, validateUser);

// get user by id
// http://localhost:4000/users//get-user-id/users-id
router.get("/get-user-id/:id", getUser);

module.exports = router;
