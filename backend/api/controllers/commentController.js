/** @format */
const { CommentQuery } = require("../utils/commentQuery");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Movie = require("../models/movieModel");
const catchAsync = require("../utils/catchAsync");

// check if movie_id and account_id exists
const validateMovieAndUser = async (movie_id, account_id) => {
  const movieExists = await Movie.findById(movie_id);
  if (!movieExists) return { valid: false, message: "Invalid movie ID" };

  const userExists = await User.findById(account_id);
  if (!userExists) return { valid: false, message: "Invalid account ID" };

  return { valid: true };
};

// get comment of a movie (paginate, sorting)
exports.getCommentsByMovie = catchAsync(async (req, res) => {
  const queryInstance = new CommentQuery(
    Comment.find({ movie_id: req.params.movie_id }).populate("user_id", "name"),
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
exports.getCommentsByAccount = catchAsync(async (req, res) => {
  // get comment
  const queryInstance = new CommentQuery(
    Comment.find({ user_id: req.params.user_id }).populate("user_id", "name"),
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
exports.createComment = catchAsync(async (req, res) => {
  req.body.movie_id = req.params.movie_id;
  const { movie_id, user_id } = req.body;

  // Validate movie_id and account_id
  const validation = await validateMovieAndUser(movie_id, user_id);
  if (!validation.valid) {
    return res.status(400).json({
      status: "fail",
      message: validation.message,
    });
  }

  // create new comment
  const newComment = await Comment.create(req.body);

  res.status(201).json({
    status: "success",
    data: newComment,
  });
});

// update comment
exports.updateComment = catchAsync(async (req, res) => {
  // Validate movie_id and account_id
  const validation = await validateMovieAndUser(
    req.query.movie_id,
    req.query.account_id
  );
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

exports.deleteComment = catchAsync(async (req, res) => {
  // Validate movie_id and account_id
  const validation = await validateMovieAndUser(
    req.query.movie_id,
    req.query.account_id
  );
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
