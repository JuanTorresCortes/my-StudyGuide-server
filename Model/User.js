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
  grade: {
    type: String,
    enum: ["4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"],
    required: true,
  },
  test: [completedTestSchema],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
