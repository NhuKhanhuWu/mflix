/** @format */

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel"); // adjust path if needed
const getToken = require("../utils/getToken"); // your token extractor

exports.verifyUserToken = catchAsync(async (req, res, next) => {
  const token = getToken(req);
  if (!token) return next(new AppError("Token required", 400));

  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError("Token is invalid or has expired!", 400));
  }

  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError("Token is invalid or has expired!", 400));

  req.user = user;
  req.email = decoded.email;

  next();
});
