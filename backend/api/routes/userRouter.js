/** @format */

const authController = require("../controllers/authController");
const express = require("express");

const router = express.Router();

// auth
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
