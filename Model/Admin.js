const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const adminSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  passwordHash: { type: String, required: true },
  role: { type: String, default: "admin" },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
