/** @format */
const Movie = require("../models/movieModel");
const catchAsync = require("../utils/catchAsync");
const { paginateAggregate } = require("../utils/paginateAggregate");

// GENRES
exports.getGenres = catchAsync(async (req, res) => {
  const sortBy = req.query.sortBy || "popular"; // "popular" | "alphabet"
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  // Base pipeline: unwind genres
  const pipeline = [
    { $unwind: "$genres" },
    {
      $group: {
        _id: "$genres",
        count: { $sum: 1 },
      },
    },
  ];

  if (sortBy === "alphabet") {
    pipeline.push({ $sort: { _id: 1 } }); // _id is genre name
  } else {
    pipeline.push({ $sort: { count: -1 } }); // default: sort by most popular
  }

  const result = await paginateAggregate(Movie, pipeline, page, limit);

  res.status(200).json({
    status: "success",
    ...result,
  });
});
// GENRES
