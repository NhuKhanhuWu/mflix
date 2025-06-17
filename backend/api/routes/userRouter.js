/** @format */

const userController = require("../controllers/userController");
const loginController = require("../controllers/authController/loginController");
const signupController = require("../controllers/authController/signupController");
const protectController = require("../controllers/authController/protectController");
const forgotPasswordController = require("../controllers/authController/forgotPasswordController");

const express = require("express");

const router = express.Router();

// sign up
router.post(
  "/sendSignupOtp",
  signupController.signupOtpLimiter,
  signupController.sendSignUpOtp
);
router.post("/checkOtp", signupController.checkOtp);
router.post("/signup", signupController.signup);

// login
router.post("/login", loginController.login);

// change password
router.post(
  "/forgotPassword",
  forgotPasswordController.forgotPasswordOtpLimiterEmail,
  forgotPasswordController.forgotPasswordOtpLimiterIP,
  forgotPasswordController.forgotPassword
);
router.patch(
  "/resetPassword",
  forgotPasswordController.checkResetPasswordToken,
  forgotPasswordController.resetPassword
);

// get my infor
router.post("/me", protectController.protect, userController.getMyInfor);

module.exports = router;
