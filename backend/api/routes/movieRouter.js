/** @format */

const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

// genres routes
router.route("/top_5_genres").get(movieController.top5Genres);

// movie route
router
  .route("/")
  .get(movieController.getAllMovie)
  .post(movieController.createMovie);

router
  .route("/:id")
  .get(movieController.getMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
