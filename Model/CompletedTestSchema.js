const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const completedTestSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  owner: { type: String, ref: "user", required: true },
  description: { type: String, required: true },
  score: { type: String, required: true },
  createdAT: { type: Date, default: Date.now },
});

module.exports = completedTestSchema;
