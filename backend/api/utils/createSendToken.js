/** @format */

const signToken = require("./signToken");

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

  // remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user: user },
  });
};

module.exports = createSendToken;
