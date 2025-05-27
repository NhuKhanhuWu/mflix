/** @format */

const { promisify } = require("util");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

const catchAsync = require("../utils/catchAsync");

const cryto = require("crypto");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 100
    ),
    httpOnly: true,
  };

  // only accent https request when in prod
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // attach cookie to response
  res.cookie("jwt", token, cookieOptions);

  //   remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user: user },
  });
};

exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  createSendToken(newUser, 200, res);
});

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

// make sure user login
exports.protect = catchAsync(async (req, res, next) => {
  // 1. check if token is sended
  // 1.1 get token
  let token;
  if (
    req.headers.authorization ||
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 1.2 check if token exists
  if (!token)
    return next(
      new AppError("You are not login. Please login to get access!", 401)
    );

  // 2. Validate token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const currUser = await User.findById(decode.id);

  if (!currUser)
    return next(
      new AppError("The user belongs to this token no longer exists!", 401)
    );

  // 4. Check if password change AFTER token was created
  if (currUser.changePasswordAfter(token.iat))
    return next(
      new AppError("User recently changed password! Please login again!", 401)
    );

  req.user = currUser; // send user along with request

  next();
});
