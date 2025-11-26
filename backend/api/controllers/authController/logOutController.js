/** @format */

const RefreshToken = require("../../models/refreshTokenModel");
const catchAsync = require("../../utils/catchAsync");

exports.logOutController = catchAsync(async (req, res) => {
  // get refresh token
  const refreshToken = req.cookies?.refreshToken;
  // console.log(refreshToken);

  //   remove from cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/",
  });

  //   delete refresh token
  await RefreshToken.findOneAndDelete({ token: refreshToken });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
