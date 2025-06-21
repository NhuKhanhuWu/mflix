/** @format */

const User = require("../../models/userModel");
const AppError = require("../../utils/appError");

const catchAsync = require("../../utils/catchAsync");
const { resetPasswordEmail, sendTokenEmail } = require("../../utils/email");
const jwt = require("jsonwebtoken");

const createOtpLimiter = require("../../utils/createLimiter");
const createSendToken = require("../../utils/createSendToken");
const signToken = require("../../utils/signToken");
const getToken = require("../../utils/getToken");
const { promisify } = require("util");

// rate limit
// For forgot-password OTP: limit 1 request per 3 mins by email
exports.forgotPasswordOtpLimiterEmail = createOtpLimiter({
  max: 1,
  windowMs: 3 * 60 * 1000,
  message:
    "You can only request a password reset once every 3 minutes with this email.",
  keyGenerator: (req) => req.body.email,
});

// For forgot-password OTP: limit 10 request per 1 hour by IP
exports.forgotPasswordOtpLimiterIP = createOtpLimiter({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message:
    "You can only request a password reset 10 times every 1 hour with your device.",
  keyGenerator: (req) => req.ip,
});

// FORGOT PASSWORD
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. get user by email
  const user = await User.findOne({ email: req.body.email });
  // still send success status to prevent attacker find which email is registed
  if (!user) {
    return res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  }

  // 2. create token, expire in 10min
  const token = signToken({ id: user._id }, "10m");

  // 3. send email
  const message = resetPasswordEmail(token);

  // FOR TESTNG WITHOUT SENDING EMAIL
  //   res.status(200).json({
  //     status: "success",
  //     message: "Token sent to email!",
  //     token,
  //   });
  // FOR TESTNG WITHOUT SENDING EMAIL

  await sendTokenEmail(
    {
      email: user.email,
      subject: "Your password reset link (valid for 10 mins)",
      htmlMessage: message,
    },
    res,
    next
  );
});

exports.checkResetPasswordToken = catchAsync(async (req, res, next) => {
  // 1. get check token
  const token = getToken(req);
  if (!token) return next(new AppError("Token required", 401));

  // 2. Verify token (catch expiration or invalid errors)
  let decodeToken;
  try {
    decodeToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError("Token is invalid or has expired! TEST", 401));
  }

  // 3. get user by id in token
  const user = await User.findById(decodeToken.id);
  if (!user) return next(new AppError("Token is invalid or has expired!", 401));

  req.user = user; // pass user to req

  next();
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. get user from req
  const user = req.user;

  // 2. update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});
