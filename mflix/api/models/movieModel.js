/** @format */

const mongoose = require("mongoose");
const slugify = require("slugify");

const movieSchema = new mongoose.Schema({
  plot: {
    type: String,
    required: [true, "Plot required"],
  },
  genres: {
    type: [String],
  },
  runtime: {
    type: Number,
    required: [true, "Runtime required"],
    select: true,
  },
  cast: {
    type: [String],
  },
  num_mflix_comments: {
    type: Number,
  },
  poster: {
    type: String,
  },
  title: {
    type: String,
    required: [true, "Title required"],
  },
  lastupdated: {
    type: Date,
  },
  languages: {
    type: [String],
  },
  released: {
    type: Date,
  },
  directors: {
    type: [String],
  },
  rated: {
    type: String,
  },
  awards: {
    wins: {
      type: Number,
    },
    nominations: {
      type: Number,
    },
    text: {
      type: String,
    },
  },
  year: {
    type: Number,
  },
  imdb: {
    rating: {
      type: Number,
    },
    votes: {
      type: Number,
    },
    id: {
      type: Number,
    },
  },
  countries: {
    type: [String],
  },
  type: {
    type: String,
  },
  tomatoes: {
    viewer: {
      rating: {
        type: Number,
      },
      numReviews: {
        type: Number,
      },
      meter: {
        type: Number,
      },
    },
    dvd: {
      type: Date,
    },
    lastUpdated: {
      type: Date,
    },
  },
});

const Movies = mongoose.model("Movies", movieSchema);

module.exports = Movies;
