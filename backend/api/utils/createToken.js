/** @format */

const signToken = require("./signToken");
const catchAsync = require("./catchAsync");
const RefreshToken = require("../models/refreshTokenModel");

const createRefreshToken = catchAsync(async (user, res) => {
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

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 20 * 24 * 60 * 60 * 1000,
    path: "/",
  });
});

const createAccessToken = (user, statusCode, res) => {
  const accessToken = signToken({ id: user._id });

  // remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    accessToken,
    data: { user: user },
  });
};

module.exports = { createAccessToken, createRefreshToken };
