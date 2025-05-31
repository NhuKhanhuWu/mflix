/** @format */

const authController = require("../controllers/authController");
const express = require("express");

const router = express.Router();

// auth
router.post("/sendSignupOtp", authController.sendSignUpOtp);
router.post("/checkOtp", authController.checkOtp);
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// change password
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword", authController.resetPassword);

module.exports = router;
