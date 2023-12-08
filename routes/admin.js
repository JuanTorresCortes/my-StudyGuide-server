var express = require("express");
var router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  validateUser,
  getAllUsers,
} = require("../Controllers/admin");

const { validateUserData } = require("../utils/validateUserData");
const { jwtValidate } = require("../utils/jwtValidate");

// register new admin
// http://localhost:4000/admin/register-admin
router.post("/register-admin", validateUserData, registerAdmin);

////////////////admin_routes

// get all users
// http://localhost:4000/admin/get-all-users
router.get("/get-all-users", getAllUsers);

module.exports = router;
