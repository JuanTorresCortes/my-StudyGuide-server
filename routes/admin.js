var express = require("express");
var router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  validateUser,
  getAllUsers,
  getAllTests,
  deleteUser,
  deleteTest,
  editTest,
  getTestByGradeSub,
} = require("../Controllers/admin");

const { validateUserData } = require("../utils/validateUserData");
const { jwtValidate } = require("../utils/jwtValidate");

// register new admin
// http://localhost:4000/admin/register-admin
router.post("/register-admin", validateUserData, registerAdmin);

// login admin
// http://localhost:4000/admin/login-admin
router.post("/login-admin", validateUserData, loginAdmin);

router.get("/validate", jwtValidate, validateUser);

// get all users
// http://localhost:4000/admin/get-all-users
router.get("/get-all-users", getAllUsers);

// get all tests
// http://localhost:4000/admin/get-all-tests
router.get("/get-all-tests", getAllTests);

// delete user by id
// http://localhost:4000/admin/users-id
router.delete("/delete-user/:userId", deleteUser);

// delete test by id
// http://localhost:4000/admin/users-id
router.delete("/delete-test/:testId", deleteTest);

router.put("/edit-test/:testId", editTest);

router.get("/getTestByGradSub", getTestByGradeSub);

module.exports = router;
