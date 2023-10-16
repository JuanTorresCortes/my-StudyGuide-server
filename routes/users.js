var express = require("express");
var router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
} = require("../Controllers/users");

const { validateUserData } = require("../utils/validateUserData");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register-user", validateUserData, registerUser);
router.get("/login-user", validateUserData, loginUser);
router.get("/get-all-users", getAllUsers);
router.get("/get-user-id/:id", getUser);
router.delete("/delete-User/:id", deleteUser);

module.exports = router;
