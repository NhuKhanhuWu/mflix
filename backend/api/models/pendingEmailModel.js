/** @format */
const mongoose = require("mongoose");
const validator = require("validator");

const pendingEmails = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    validate: [validator.isEmail, "Invalid email"],
  },
  otp: String,
  otpExpires: {
    type: Date,
    required: true,
    index: { expires: 0 }, //delete doc when otp expired
  },
});

module.exports = mongoose.model("PendingEmails", pendingEmails);
