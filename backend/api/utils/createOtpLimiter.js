/** @format */

// utils/createOtpLimiter.js
const rateLimit = require("express-rate-limit");

function createOtpLimiter({ max, windowMs, message, keyGenerator }) {
  return rateLimit({
    windowMs, // e.g., 3 * 60 * 1000 = 3 minutes
    max, // e.g., 1 request in the window
    message:
      typeof message === "function" ? message : { status: "fail", message },
    keyGenerator: keyGenerator || ((req) => req.ip), // default to IP if not provided
    standardHeaders: true,
    legacyHeaders: false,
  });
}

module.exports = createOtpLimiter;
