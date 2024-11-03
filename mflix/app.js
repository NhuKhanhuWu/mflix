/** @format */

const express = require("express");
const movieRouter = require("./api/routes/movieRouter");

const app = express();
app.use(express.json());

// ROUTER
app.use("/api/v1/movies", movieRouter);

module.exports = app;
