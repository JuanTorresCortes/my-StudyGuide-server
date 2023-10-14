var express = require("express");
var router = express.Router();

const { registerUser, loginUser } = require("../Controllers/users");

const { validateUserData } = require("../utils/validateUserData");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register-user", validateUserData, registerUser);
router.get("/login-user", validateUserData, loginUser);

module.exports = router;
