/** @format */
const Movie = require("../models/movieModel");
const MovieQuery = require("../utils/movieQuery");

exports.getAllMovie = async (req, res) => {
  try {
    // get movie
    const query = new MovieQuery(Movie.find(), req.query)
      .paginate()
      .limitField()
      .gerne()
      .filter()
      .sort();
    const movies = await query.query;

    res.status(200).json({
      status: "success",
      amount: movies.length,
      data: movies,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: movie,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);

    res.status(201).json({
      status: "success",
      data: newMovie,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: movie,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);

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
