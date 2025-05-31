/** @format */

const validator = require("validator");

const commonUserFields = {
  name: {
    type: String,
    required: [true, "User name required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    validate: [validator.isEmail, "Invalid email"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
};

module.exports = commonUserFields;
