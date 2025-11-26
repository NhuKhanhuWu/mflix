/** @format */

const signToken = require("./signToken");
const catchAsync = require("./catchAsync");
const RefreshToken = require("../models/refreshTokenModel");

const createRefreshToken = catchAsync(async (user, req, res) => {
  // create refresh token
  const refreshToken = signToken(
    { id: user._id },
    process.env.JWT_REFRESH_EXPIRES_IN
  );

  // save to db
  await RefreshToken.create({
    token: refreshToken,
    userId: user._id,
  });

  // FOR TEST COOKIE IN PRODUCTION: START
  req.refreshToken = refreshToken;
  // FOR TEST COOKIE IN PRODUCTION: END

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 20 * 24 * 60 * 60 * 1000,
    path: "/",
  });
});

const createAccessToken = (user, statusCode, req, res) => {
  const accessToken = signToken({ id: user._id });
  const refreshToken = req.refreshToken;

  user.password = undefined; // remove password from output

  res.status(statusCode).json({
    status: "success",
    accessToken,
    refreshToken,
    data: { user: user },
  });
};

module.exports = { createAccessToken, createRefreshToken };
