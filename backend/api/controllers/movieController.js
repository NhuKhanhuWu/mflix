/** @format */
const Movie = require("../models/movieModel");
const Comment = require("../models/commentModel");
const { MovieQuery } = require("../utils/movieQuery");
const catchAsync = require("../utils/catchAsync");
const { paginateAggregate } = require("../utils/paginateAggregate");
const { default: slugify } = require("slugify");

// MOVIE
// get movies (many movies at once, limit fields)
exports.getAllMovie = catchAsync(async (req, res) => {
  // Otherwise, use regular Mongoose query
  const queryInstance = new MovieQuery(Movie.find(), req.query);
  queryInstance.limitField().search().genre().filter().sort();
  await queryInstance.paginate(); // Await the async paginate method

  const movies = await queryInstance.query;

  res.status(200).json({
    status: "success",
    totalResult: queryInstance.totalResults,
    totalPages: Math.ceil(queryInstance.totalResults / movies.length),
    amount: movies.length,
    data: movies,
  });
});

// get one movie, all fields
exports.getMovieById = catchAsync(async (req, res) => {
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

// Sort by most reviewed
exports.sortByMostReviewed = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  // const result = await sortMostPopularMovie(page * 1, limit * 1);

  const pipeline = [
    {
      $group: {
        _id: "$movie_id",
        reviewCount: { $sum: 1 },
      },
    },
    { $sort: { reviewCount: -1 } },
    {
      $lookup: {
        from: "movies",
        localField: "_id",
        foreignField: "_id",
        as: "movie",
      },
    },
    { $unwind: "$movie" },
    {
      $project: {
        _id: 0,
        // reviewCount: 1,
        imdb: "$movie.imdb",
        plot: "$movie.plot",
        genres: "$movie.genres",
        poster: "$movie.poster",
        title: "$movie.title",
        runtime: "$movie.runtime",
        slug: "$movie.slug",
      },
    },
  ];

  const result = await paginateAggregate(Comment, pipeline, page, limit);

  result.data = result.data.map((movie) => ({
    ...movie,
    slug: slugify(movie.title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    }),
  }));

  res.status(200).json({
    status: "success",
    ...result,
  });
});
