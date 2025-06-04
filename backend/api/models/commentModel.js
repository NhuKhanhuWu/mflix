/** @format */

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movies",
    required: [true, "Movie id required"],
  },
  text: {
    type: String,
    required: [true, "Text required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "Users id required"],
  },
});

// set the cmt date before save
commentSchema.pre("save", function (next) {
  this.date = Date.now();
  next();
});

module.exports = mongoose.model("Comments", commentSchema);
