/** @format */

const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(commentController.getComments)
  .post(commentController.createComment);

router
  .route("/:id")
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
