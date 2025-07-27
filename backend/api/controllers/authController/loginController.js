/** @format */
const User = require("../../models/userModel");
const AppError = require("../../utils/appError");
const createSendToken = require("../../utils/createSendToken");
const catchAsync = require("../../utils/catchAsync");

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password is sended
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  //check user and password
  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password)))
    return next(new AppError("Incorrect email or password", 401));

  // if ok, send token
  createSendToken(user, 200, res);
});
