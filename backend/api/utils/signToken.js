/** @format */

const jwt = require("jsonwebtoken");

const signToken = (payload, expiresIn = process.env.JWT_EXPIRES_IN) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

module.exports = signToken;
