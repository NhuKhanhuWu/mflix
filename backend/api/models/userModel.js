/** @format */

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    validate: [validator.isEmail, "Invalid email"],
  },
  role: {
    type: String,
    emun: ["user", "admin", "moderator "],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlenght: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // only work on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
});

// process password before save
userSchema.pre("save", async function (next) {
  // only run if password is modified
  if (!this.isModified("password")) return next();

  // hash password before save
  this.password = await bcrypt.hash(this.password, 12);

  // removie password comfirm
  this.passwordConfirm = undefined;

  next();
});

// compare password
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// check if user has change password after timestamp
userSchema.methods.changePasswordAfter = function (JWTtimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // check if password was created BEFORE password was changed
    return JWTtimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

module.exports = mongoose.model("Users", userSchema);
