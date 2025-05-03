/** @format */

const express = require("express");
const genreController = require("../controllers/genreController");

const router = express.Router();

// sort genres by alphabet/most popular
router.route("/").get(genreController.getGenres);

module.exports = router;
