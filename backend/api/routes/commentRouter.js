/** @format */

const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

const router = express.Router();

/**
 * Route: /api/v1/comments
 * Description: Get all comments by movie, or create a new comment
 */
router
  .route("/")
  .get(commentController.getCommentsByMovie) // expects ?movie_id= or similar
  .post(authController.protect, commentController.createComment);

/**
 * Route: /api/v1/comments/:id
 * Description: Update or delete a specific comment
 */
router
  .route("/:id")
  .patch(authController.protect, commentController.updateComment)
  .delete(authController.protect, commentController.deleteComment);

/**
 * Route: /api/v1/users/:user_id/comments
 * Description: Get all comments by a specific user
 */
router.route("/by-user").get(commentController.getCommentsByAccount); // expects req.params.user_id

module.exports = router;
