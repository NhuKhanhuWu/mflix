/** @format */

const authController = require("../controllers/authController");
const express = require("express");

const router = express.Router();

// auth
router.post(
  "/sendSignupOtp",
  authController.signupOtpLimiter,
  authController.sendSignUpOtp
);
router.post(
  "/checkOtp",

  authController.checkOtp
);
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// change password
router.post(
  "/forgotPassword",
  authController.forgotPasswordOtpLimiterEmail,
  authController.forgotPasswordOtpLimiterIP,
  authController.forgotPassword
);
router.patch(
  "/resetPassword",
  authController.checkResetPasswordToken,
  authController.resetPassword
);

module.exports = router;
