/** @format */

const express = require("express");
const commentController = require("../controllers/commentController");

const commentByMovieRouter = express.Router({ mergeParams: true });
const commentByAccountRouter = express.Router({ mergeParams: true });

// comment by movie
commentByMovieRouter
  .route("/")
  .get(commentController.getCommentsByMovie)
  .post(commentController.createComment);

commentByMovieRouter
  .route("/:id")
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

// comment by account
commentByAccountRouter.route("/").get(commentController.getCommentsByAccount);

module.exports = { commentByMovieRouter, commentByAccountRouter };
