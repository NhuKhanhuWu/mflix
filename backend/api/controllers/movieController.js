/** @format */
const { default: axios } = require("axios");
const Movie = require("../models/movieModel");
const MovieQuery = require("../utils/movieQuery");

// MOVIE
// get movies (many movies at once, limit fields)
exports.getAllMovie = async (req, res) => {
  try {
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

// get one movie, all fieldsfields
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

// create new moviemovie
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

// update movie
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

// delete movie
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
// MOVIE

// GENRES
exports.top5Genres = async (req, res) => {
  try {
    const topGenres = await Movie.aggregate([
      // Unwind the genres array to handle each genre individually
      { $unwind: "$genres" },

      // group by each genres
      {
        $group: {
          _id: "$genres",
          count: { $sum: 1 },
        },
      },

      // sort by count (desc)
      {
        $sort: {
          count: -1,
        },
      },

      // limit result
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({
      status: "success",
      data: topGenres,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
// GENRES
