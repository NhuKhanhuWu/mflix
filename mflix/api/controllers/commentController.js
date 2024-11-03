/** @format */
const CommentQuery = require("../utils/commentQuery");
const Comment = require("../models/commentModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// check comment.movie_id === movie_id
async function checkMovieId(req) {
  // if id invalid
  if (!ObjectId.isValid(req.params.id)) {
    return false;
  }

  //   if no cmt / id not match
  const comment = await Comment.findById(req.params.id);
  if (!comment || comment.movie_id.toString() !== req.params.movie_id)
    return false;

  return true;
}

// get comment of a movie (paginate, sorting)
exports.getComments = async (req, res) => {
  try {
    // get comment
    const query = new CommentQuery(
      Comment.find({ movie_id: req.params.movie_id }),
      req.query
    )
      .paginate()
      .limitField()
      .sort();
    const comment = await query.query;

    res.status(200).json({
      status: "success",
      amount: comment.length,
      data: comment,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// create comment
exports.createComment = async (req, res) => {
  try {
    req.body.movie_id = req.params.movie_id;
    const newComment = await Comment.create(req.body);

    res.status(201).json({
      status: "success",
      data: newComment,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// update comment
exports.updateComment = async (req, res) => {
  try {
    // check if movie has comment
    if (!(await checkMovieId(req))) throw new Error("Invalid request id");

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: updatedComment,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    // check if movie has comment
    if (!checkMovieId(req)) {
      console.log(`${!checkMovieId(req)}😭😭😭`);
      throw new Error("Invalid request id");
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
