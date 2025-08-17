/** @format */
const PendingEmails = require("../../models/pendingEmailModel");
const User = require("../../models/userModel");
const AppError = require("../../utils/appError");

const catchAsync = require("../../utils/catchAsync");
const { otpEmail, sendTokenEmail } = require("../../utils/email");
const jwt = require("jsonwebtoken");

const createOtpLimiter = require("../../utils/createLimiter");
const createSendToken = require("../../utils/createSendToken");
const signToken = require("../../utils/signToken");
const getToken = require("../../utils/getToken");
const { promisify } = require("util");

// CREATE RATE LIMITTER
// sign up otp
exports.signupOtpLimiter = createOtpLimiter({
  max: 1, // 1 request
  windowMs: 3 * 60 * 1000, // 3 mins
  message:
    "You can only request signup OTP once every 3 minutes with this email.",
  keyGenerator: (req) => req.body.email,
});

// SIGN UP
exports.sendSignUpOtp = catchAsync(async (req, res, next) => {
  // 1. get & check email
  const { email } = req.body;
  if (!email) return next(new AppError("Email required", 400));

  // 1.1 check if already in use
  const userExists = await User.findOne({ email });
  if (userExists) return next(new AppError("Email already in use", 400));

  // 2. create otp
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins

  // 3. save request to db
  await PendingEmails.findOneAndUpdate(
    { email },
    { otp, otpExpires },
    { upsert: true, new: true }
  );

  // 4. send email
  const emailMessage = otpEmail(otp);

  await sendTokenEmail(
    {
      email: email,
      subject: "Your sign up OTP (valid for 10 mins)",
      htmlMessage: emailMessage,
    },
    res,
    next
  );

  res.status(200).json({
    status: "success",
    message: "OTP sended!",
  });
});

exports.checkOtp = catchAsync(async (req, res, next) => {
  // 1. check if otp and email is sended
  const { otp, email } = req.body;
  if (!otp || !email) return next(new AppError("Otp and email required", 400));

  // 2. check if otp is valid
  const pendingEmail = await PendingEmails.findOne({ email });

  if (!pendingEmail || pendingEmail.otpExpires < Date.now())
    return next(new AppError("Invalid email or invalid otp", 401));
  if (pendingEmail.otp !== otp) return next(new AppError("Invalid otp", 401));

  // 3. create jwt
  const token = signToken({ email: email });

  // 4. send result
  res.status(200).json({
    status: "success",
    token,
    message: "OTP valid!",
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  // get email from token
  const token = getToken(req);
  // chek if token is sended
  if (!token)
    return next(
      new AppError("Please validate your email before execute this action", 401)
    );

  const { email } = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // check email
  const existsUser = await User.findOne({ email });
  if (existsUser) return next(new AppError("Email already in used", 401));

  // create user
  const newUser = await User.create({
    name: req.body.name,
    // role: req.body.role,
    email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // delete request in PendingUser
  await PendingEmails.findOneAndDelete({ email });

  createSendToken(newUser, 200, res);
});
// SIGN UP
