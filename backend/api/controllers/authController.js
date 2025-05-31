/** @format */

const { promisify } = require("util");
const User = require("../models/userModel");
const PendingEmails = require("../models/pendingEmailModel");
const AppError = require("../utils/appError");

const catchAsync = require("../utils/catchAsync");
const {
  resetPasswordEmail,
  otpEmail,
  sendTokenEmail,
} = require("../utils/email");

const jwt = require("jsonwebtoken");

const signToken = (payload, expiresIn = process.env.JWT_EXPIRES_IN) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
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
  const token = signToken({ id: user._id });
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

// SIGN UP
exports.sendSignUpOtp = catchAsync(async (req, res, next) => {
  // 1. get & check email
  const { email } = req.body;
  if (!email) return next(new AppError("Email required", 400));

  const userExists = await User.findOne({ email });
  if (userExists) return next(new AppError("Email already in used", 400));

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
      subject: "Your password reset token (valid for 10 mins)",
      htmlMessage: emailMessage,
    },
    res,
    next
  );
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
  // if (pendingEmail.otpExpires < Date.now())
  //   return next(new AppError("Otp expired", 401));

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
  if (existsUser) return next(new AppError("Email already in use", 401));

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
  const token = signToken({ id: user._id }, "10m");

  // 3. send email
  const message = resetPasswordEmail(token);

  await sendTokenEmail(
    {
      email: user.email,
      subject: "Your password reset token (valid for 10 mins)",
      htmlMessage: message,
    },
    res,
    next
  );
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
