/** @format */

const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    require: [true, "Token required"],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    require: [true, "User id required"],
  },
  tokenExpires: {
    type: Date,
    index: { expires: 0 },
  },
});

// add expires date before save
refreshTokenSchema.pre("save", function (next) {
  const expiresDate = new Date(Date.now() + 20 * 24 * 60 * 60 * 1000); // 20 days
  this.tokenExpires = expiresDate;
  next();
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;
