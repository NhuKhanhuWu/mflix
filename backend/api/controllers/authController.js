/** @format */

const { promisify } = require("util");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

const catchAsync = require("../utils/catchAsync");
const { resetPasswordEmail, sendEmail } = require("../utils/email");

const jwt = require("jsonwebtoken");

const signToken = (id, expiresIn = process.env.JWT_EXPIRES_IN) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

const getToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
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
  const token = getToken(req);

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

// forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("No user found!", 404));

  // 2. create token, expire in 10min
  const token = signToken(user.id, "10m");

  // 3. send email
  const message = resetPasswordEmail(token);

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 mins)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    console.error("EMAIL SEND ERROR:", err);

    return next(
      new AppError("There was an error sending the email. Try again later!")
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. get check token
  const token = getToken(req);

  // 2 check if token is sended or expired
  const decodeToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  if (!token) return next(new AppError("Token required"));

  // 3. get user by id in token
  const user = await User.findById(decodeToken.id);
  if (!user) return next(new AppError("Token is invalid or has expired!", 400));

  // 4. update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});
