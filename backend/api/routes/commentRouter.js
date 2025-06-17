/** @format */

const express = require("express");
const commentController = require("../controllers/commentController");
const protectController = require("../controllers/authController/protectController");

const router = express.Router();

/**
 * Route: /api/v1/comments
 * Description: Get all comments by movie, or create a new comment
 */
router
  .route("/")
  // .get(commentController.getCommentsByMovie) // expects ?movie_id= or similar
  .get(commentController.getCommentsByMovie)
  .post(
    protectController.protect,
    commentController.newCommentLimiter,
    commentController.createComment
  );

/**
 * Route: /api/v1/comments/:id
 * Description: Update or delete a specific comment
 */
router
  .route("/:id")
  .patch(protectController.protect, commentController.updateMyComment)
  .delete(protectController.protect, commentController.deleteMyComment);

/**
 * Route: /api/v1/users/:user_id/comments
 * Description: Get all comments by a specific user (only if user login)
 */
router
  .route("/my-comments")
  .get(protectController.protect, commentController.getMyComments); // expects req.params.user_id

module.exports = router;
