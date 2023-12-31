const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const completedTestSchema = require("../Model/CompletedTestSchema");

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  gradeLevel: {
    type: String,
    enum: ["3", "4", "5", "6", "7", "8"],
    required: true,
  },
  passwordHash: { type: String, required: true },
  testRecord: [completedTestSchema],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
