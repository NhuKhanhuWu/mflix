/** @format */
const { CommentQuery } = require("../utils/commentQuery");
const Comment = require("../models/commentModel");
const Movie = require("../models/movieModel");
const AppError = require("../utils/appError");

const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");

// REQUEST FROM USER
// check if movie_id and account_id exists
const checkMovieExists = async (movie_id) => {
  // if id is invalid
  if (!mongoose.Types.ObjectId.isValid(movie_id)) return false;

  // if movie not exists
  const movieExists = await Movie.findById(movie_id);
  if (!movieExists) return false;

  return true;
};

// get comment of a movie (paginate, sorting)
exports.getCommentsByMovie = catchAsync(async (req, res) => {
  const queryInstance = new CommentQuery(
    Comment.find({ movie_id: req.query.movie_id }).populate("user_id", "name"),
    req.query
  )
    .limitField()
    .sort();

  await queryInstance.paginate();

  const comment = await queryInstance.query;

  res.status(200).json({
    status: "success",
    amount: comment.length,
    totalResult: queryInstance.totalResult,
    totalPages: Math.ceil(queryInstance.totalResult / comment.length),
    data: comment,
  });
});

// get comment of an account (paginate, sorting)
exports.getMyComments = catchAsync(async (req, res) => {
  // get comment
  const queryInstance = new CommentQuery(
    Comment.find({ user_id: req.user._id }).populate("user_id", "name"),
    req.query
  )
    .limitField()
    .sort();

  await queryInstance.paginate();

  // return comment
  const comment = await queryInstance.query;

  res.status(200).json({
    status: "success",
    amount: comment.length,
    totalResult: queryInstance.totalResult,
    data: comment,
  });
});

// create comment
exports.createComment = catchAsync(async (req, res, next) => {
  const { movie_id, text } = req.body;

  // Validate movie_id and account_id
  const isMovieExists = await checkMovieExists(movie_id);
  if (!isMovieExists) {
    return next(new AppError("Movie not exists", 400));
  }

  // create new comment
  const newComment = await Comment.create({
    movie_id: movie_id,
    text: text,
    user_id: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: newComment,
  });
});

// update comment
exports.updateMyComment = catchAsync(async (req, res) => {
  // Validate movie_id and account_id
  const validation = await checkMovieExists(req.query.movie_id);
  if (!validation.valid) {
    return res.status(400).json({
      status: "fail",
      message: validation.message,
    });
  }

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
});

exports.deleteMyComment = catchAsync(async (req, res) => {
  // Validate movie_id and account_id
  const validation = await checkMovieExists(req.query.movie_id);
  if (!validation.valid) {
    return res.status(400).json({
      status: "fail",
      message: validation.message,
    });
  }

  await Comment.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// REQUEST FROM ADMIN
