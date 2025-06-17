/** @format */
const User = require("../../models/userModel");
const AppError = require("../../utils/appError");

const catchAsync = require("../../utils/catchAsync");
const jwt = require("jsonwebtoken");

const getToken = require("../../utils/getToken");
const { promisify } = require("util");

// MAKE SURE USER LOGIN
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
