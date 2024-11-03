/** @format */
const Movie = require("../models/movieModel");
const MovieQuery = require("../utils/movieQuery");

exports.getAllMovie = async (req, res) => {
  try {
    const query = new MovieQuery(Movie.find(), req.query)
      .filter()
      .gerne()
      .sort()
      .limitField()
      .paginate();
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
