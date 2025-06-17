/** @format */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const commonUserFields = require("./shared/userFields");

const userSchema = new mongoose.Schema({
  ...commonUserFields,
  role: {
    type: String,
    emun: ["user", "admin", "moderator "],
    default: "user",
  },
  passwordChangedAt: Date,
  avartar: {
    type: String,
    default:
      "https://i.pinimg.com/474x/e6/e4/df/e6e4df26ba752161b9fc6a17321fa286.jpg",
  },
});

// PRE SAVE
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

// prevent passwordChangedAt if smaller jwt created time & automatically save it
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// METHOBS
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
