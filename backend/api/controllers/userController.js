/** @format */

const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { changeUsersEmail, sendTokenEmail } = require("../utils/email");
const signToken = require("../utils/signToken");
const createLimiter = require("../utils/createLimiter");

exports.updateEmailLimiter = createLimiter({
  max: 1,
  windowMs: 24 * 60 * 60 * 1000,
  message: "You can only change email every 24 hours.",
  keyGenerator: (req) => req.user._id.toString(),
});

exports.getMyInfor = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});

// change email
exports.changeMyEmailReq = catchAsync(async (req, res, next) => {
  // create token
  const token = signToken({ email: req.body.email, id: req.user.id }, "10m");

  // create & send confirm email
  const email = changeUsersEmail(token);
  await sendTokenEmail(
    {
      email: req.body.email,
      subject: "Confirm change of Mflix account email (valid for 10 mins)",
      htmlMessage: email,
    },
    res,
    next
  );

  // send res
  res.status(200).json({
    status: "success",
    message: "Confirm link sended!",
  });
});

exports.checkChangeEmailReq = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;

  // check if password sended
  if (!password) return next(new AppError("Password required.", 401));

  // check if password correct
  const user = await User.findById(
    new mongoose.Types.ObjectId(req.user._id)
  ).select("+password");

  if (!(await user.comparePassword(password, user.password)))
    return next(new AppError("Incorrect password", 401));

  // check if new email is sended
  if (!email) return next(new AppError("New email required.", 401));

  // check if email is the same as before
  if (req.user.email === email)
    return next(
      new AppError("New email must be different from the current one.", 401)
    );

  // check if email already in used
  const isUsed = await User.findOne({ email });
  if (isUsed) return next(new AppError("Email already in used.", 401));

  next();
});

exports.changeEmail = catchAsync(async (req, res) => {
  // 1 get user & new email
  const user = req.user;
  const newEmail = req.email;

  // 2. change email
  user.email = newEmail;
  await user.save({ validateBeforeSave: false });

  // 3. send res
  res.status(200).json({
    status: "success",
    user,
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { currPassword, password, passwordConfirm } = req.body;

  // check if data is sended
  if (!currPassword || !password || !passwordConfirm)
    return next(
      new AppError(
        "All currPassword, password and passwordConfirm are required",
        401
      )
    );

  // check if password correct
  const user = await User.findById(
    new mongoose.Types.ObjectId(req.user._id)
  ).select("+password");

  if (!(await user.comparePassword(currPassword, user.password)))
    return next(new AppError("Incorrect password", 401));

  // check if currPassword !== password
  if (currPassword === password)
    return next(
      new AppError(
        "The new password must be different from the current password",
        401
      )
    );

  // update password
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  // return res
  res.status(200).json({
    status: "success",
    message: "Password updated!",
  });
});
