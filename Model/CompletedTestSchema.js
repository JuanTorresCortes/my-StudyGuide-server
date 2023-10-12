const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const completedTestSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  testTopic: { type: String, required: true },
  owner: { type: String, ref: "user", required: true },
  score: { type: String, required: true },
  createdAT: { type: Date, default: Date.now },
});

module.exports = completedTestSchema;
