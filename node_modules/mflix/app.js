/** @format */

const express = require("express");
const movieRouter = require("./api/routes/movieRouter");
const commentRouter = require("./api/routes/commentRouter");

const app = express();
app.use(express.json());

// ROUTER
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/movies/:movie_id/comments", commentRouter);

module.exports = app;
