/** @format */

const express = require("express");
const movieController = require("../controllers/movieController");
const router = express.Router();

// movie route
router
  .route("/")
  .get(movieController.getAllMovie)
  .post(movieController.createMovie)
  .get(movieController.sortByMostReviewed);

router
  .route("/id/:id")
  .get(movieController.getMovieById)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

router.route("/slug/:slug").get(movieController.getMovieByName);

module.exports = router;
