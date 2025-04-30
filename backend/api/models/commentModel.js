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

module.exports = mongoose.model("Comments", commentSchema);
