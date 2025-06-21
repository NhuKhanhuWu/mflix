/** @format */

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getMyInfor = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});
