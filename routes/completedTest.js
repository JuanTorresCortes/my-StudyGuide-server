var express = require("express");
var router = express.Router();

const {
  addTestCompleted,
  getTestCompleted,
  deleteCompletedTest,
} = require("../Controllers/completedTest");

// add completed test by user id and test data
// http://localhost:4000/test-complete/add-completed-test/userId
router.post("/add-completed-test/:id", addTestCompleted);

// get all users completed tests by user id
// http://localhost:4000/test-complete/get-completed-test/id
router.get("/get-completed-test/:id", getTestCompleted);

// delete completed test by user id and test id
// http://localhost:4000/test-complete/delete-completed-test/userId/testId
router.delete("/delete-completed-test/:userId/:testId", deleteCompletedTest);

module.exports = router;
