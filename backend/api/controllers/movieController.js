/** @format */
const { default: axios } = require("axios");
const Movie = require("../models/movieModel");
const MovieQuery = require("../utils/movieQuery");
const catchAsync = require("../utils/catchAsync");

// MOVIE
// get movies (many movies at once, limit fields)
exports.getAllMovie = catchAsync(async (req, res) => {
  const queryInstance = new MovieQuery(Movie.find(), req.query);
  queryInstance.limitField().gerne().filter().sort().search();
  await queryInstance.paginate(); // Await the async paginate method

  const movies = await queryInstance.query;

  res.status(200).json({
    status: "success",
    totalResult: queryInstance.totalResults,
    amount: movies.length,
    data: movies,
  });
});

// get one movie, all fieldsfields
exports.getMovie = catchAsync(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: movie,
  });
});

// create new moviemovie
exports.createMovie = catchAsync(async (req, res) => {
  const newMovie = await Movie.create(req.body);

  res.status(201).json({
    status: "success",
    data: newMovie,
  });
});

// update movie
exports.updateMovie = catchAsync(async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: movie,
  });
});

// delete movie
exports.deleteMovie = catchAsync(async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
// MOVIE

// GENRES
exports.top5Genres = catchAsync(async (req, res) => {
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
    totalResult: topGenres.length,
    amount: topGenres.length,
    data: topGenres,
  });
});
// GENRES
