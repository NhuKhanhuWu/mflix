/** @format */
const User = require("../../models/userModel");
const AppError = require("../../utils/appError");
const getToken = require("../../utils/getToken");
const RefreshToken = require("../../models/refreshTokenModel");
const catchAsync = require("../../utils/catchAsync");
const signToken = require("../../utils/signToken");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// MAKE SURE USER LOGIN
exports.protect = catchAsync(async (req, res, next) => {
  // 1. check if token is sended
  // 1.1 get token
  const accessToken = getToken(req);
  const refreshToken = req.cookies?.refreshToken;
  // console.log(accessToken, "⭐", refreshToken);

  // 1.2 check if token exists
  if (!accessToken || !refreshToken)
    return next(
      new AppError("You are not login. Please login to get access!", 401)
    );

  // 2. Validate token
  const decode = await promisify(jwt.verify)(
    accessToken,
    process.env.JWT_SECRET,
    { ignoreExpiration: true }
  );

  // if acces token expired => get new ny refresh token
  if (Date.now() > decode.exp * 1000) {
    // check refresh token
    const isRefreshAble = await RefreshToken.findOne({ token: refreshToken });

    if (!isRefreshAble)
      return next(
        new AppError("Login session expired! Please login again!", 401)
      );

    // create new access token
    let newAccessToken = signToken(
      { id: decode.id },
      process.env.JWT_ACCESS_EXPIRES_IN
    );

    // attach new token to req
    req.accessToken = newAccessToken;
  }

  // 3. Check if user still exists
  const currUser = await User.findById(decode.id);

  if (!currUser)
    return next(
      new AppError("The user belongs to this token no longer exists!", 401)
    );

  // 4. Check if password change AFTER token was created
  if (currUser.changePasswordAfter(accessToken.iat))
    return next(
      new AppError("User recently changed password! Please login again!", 401)
    );

  req.user = currUser; // send user along with request

  next();
});
