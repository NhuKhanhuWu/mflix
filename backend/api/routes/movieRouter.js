/** @format */

const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

// sort by most reviewd
// router.route("/most_rated").get(movieController.sortByMostReviewed);

// movie route
router
  .route("/")
  .get(movieController.getAllMovie)
  .post(movieController.createMovie)
  .get(movieController.sortByMostReviewed);

router
  .route("/:id")
  .get(movieController.getMovieById)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
