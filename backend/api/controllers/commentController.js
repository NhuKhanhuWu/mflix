/** @format */
const CommentQuery = require("../utils/commentQuery");
const Comment = require("../models/commentModel");
const Movie = require("../models/movieModel");
const AppError = require("../utils/appError");

const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");
const createLimiter = require("../utils/createLimiter");

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
  const queryInstance = new CommentQuery(Comment, req.query);

  await queryInstance
    .matchMovie() // find cmt of certain movie
    .prioritizeUser() // cmt of logged user (user_id) on top
    .sort() // sort movie
    .lookupUser() // look up user of cmt
    .limitFields() // limit returned fields
    .paginate(); // paginate (20 by default)

  const comments = await queryInstance.exec();

  res.status(200).json({
    status: "success",
    amount: comments.length,
    totalResult: queryInstance.totalResult,
    totalPages: Math.ceil(queryInstance.totalResult / comments.length),
    data: comments,
  });
});

// get comment of an account (paginate, sorting)
exports.getMyComments = catchAsync(async (req, res) => {
  // get comment
  const queryInstance = new CommentQuery(Comment, req.query, req.user._id);

  await queryInstance.matchUser().lookupMovie().sort().limitFields().paginate();

  // return comment
  const comment = await queryInstance.exec();

  res.status(200).json({
    status: "success",
    amount: comment.length,
    totalResult: queryInstance.totalResult,
    data: comment,
  });
});

// create comment
exports.newCommentLimiter = createLimiter({
  max: 1,
  windowMs: 30 * 1000,
  keyGenerator: (req) => req.ip,
  message: "Please wait before posting another comment.",
});

exports.createComment = catchAsync(async (req, res, next) => {
  const { movie_id, text } = req.body;

  // Validate movie_id and account_id
  if (!(await checkMovieExists(movie_id))) {
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
exports.updateMyComment = catchAsync(async (req, res, next) => {
  const currCmt = await Comment.findById(req.params.cmt_id);

  // check if cmt exists
  if (!currCmt) return next(new AppError("Comment not found!", 404));

  // check if cmt belongs to logged user
  if (currCmt.user_id.toString() !== req.user.id)
    return next(
      new AppError("This comment does not belong to your account!", 403)
    );

  // Update cmt
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.cmt_id,
    { text: req.body.text },
    {
      runValidators: true,
      new: true,
    }
  );

  // send res
  res.status(200).json({
    status: "success",
    data: updatedComment,
  });
});

exports.deleteMyComment = catchAsync(async (req, res, next) => {
  const currCmt = await Comment.findById(req.params.cmt_id);

  // check if cmt exists
  if (!currCmt) return next(new AppError("Comment not found!", 404));

  // check if cmt belongs to logged user
  if (currCmt.user_id.toString() !== req.user.id)
    return next(
      new AppError("This comment does not belong to your account!", 403)
    );

  await Comment.findByIdAndDelete(req.params.cmt_id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// REQUEST FROM ADMIN
