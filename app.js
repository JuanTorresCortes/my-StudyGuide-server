var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");

const cors = require("cors"); // Cross-Origin Resource Sharing middleware
require("dotenv").config(); // Loads environment variables from a .env file

const { mongooseConnect } = require("./mongoose"); // Custom module for connecting to MongoDB using Mongoose
mongooseConnect(); // Connect to the MongoDB database

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const testsRouter = require("./routes/tests");
const testCompletedRouter = require("./routes/completedTest");
const adminRouter = require("./routes/admin");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

const corsOrigin =
  process.env.NODE_ENV === "production"
    ? "http://StudyGuide.juan-codes.com"
    : "http://localhost:4000";

app.use(cors({ origin: process.env.CORS_ORIGIN || corsOrigin }));

if (!process.env.CORS_ORIGIN) {
  console.error("CORS_ORIGIN environment variable is not set.");
  process.exit(1); // Exit if critical configuration is missing
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/tests", testsRouter);
app.use("/api/test-complete", testCompletedRouter);
app.use("/api/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
