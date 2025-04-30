/** @format */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
});

module.exports = mongoose.model("Users", userSchema);
