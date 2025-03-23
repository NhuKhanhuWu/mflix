/** @format */

const express = require("express");
const cors = require("cors");
const AppError = require("./api/utils/appError");
const globalErrHandler = require("./api/controllers/errorController");

const movieRouter = require("./api/routes/movieRouter");
const commentRouter = require("./api/routes/commentRouter");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// ROUTER
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/movies/:movie_id/comments", commentRouter);
app.use("/api/v1/genres/", movieRouter);

// ERROR
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 400));
});

app.use(globalErrHandler);

module.exports = app;
