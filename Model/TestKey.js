const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const testKey = new mongoose.Schema({
  _id: { type: String, default: uuid },
  testKeyTopic: { type: String, required: true },
  key: [],
});

const TestKey = mongoose.model("testKey", testKey);

module.exports = TestKey;
