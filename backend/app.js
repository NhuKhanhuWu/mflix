/** @format */

const express = require("express");
const cors = require("cors");
const AppError = require("./api/utils/appError");
const globalErrHandler = require("./api/controllers/errorController");

const movieRouter = require("./api/routes/movieRouter");
const {
  commentByMovieRouter,
  commentByAccountRouter,
} = require("./api/routes/commentRouter");

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // allow frontend request
app.use(express.json());

// ROUTER
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/genres/", movieRouter);
app.use("/api/v1/movies/:movie_id/comments", commentByMovieRouter);
app.use("/api/v1/users/:user_id/comments", commentByAccountRouter);

// ERROR
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 400));
});

app.use(globalErrHandler);

module.exports = app;
