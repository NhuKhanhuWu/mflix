/** @format */

const express = require("express");
const cors = require("cors");
const path = require("path");

const AppError = require("./api/utils/appError");
const globalErrHandler = require("./api/controllers/errorController");

const movieRouter = require("./api/routes/movieRouter");
const genresRouter = require("./api/routes/genresRoutes");
const {
  commentByMovieRouter,
  commentByAccountRouter,
} = require("./api/routes/commentRouter");

const app = express();

// allow fronend origin
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow if :
      // - No origin (Postman)
      // - Localhost in dev
      // - Any domain of vercel's project `nhukhanhuwus-projects`
      if (
        !origin ||
        origin === "http://localhost:5173" ||
        origin.endsWith("nhukhanhuwus-projects.vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // if need cookies
  })
);

// app.use(cors({ origin: "http://localhost:5173" })); // allow frontend request
app.use(express.json());

// Serve static files from React frontend in production
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// ROUTER
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/genres/", genresRouter);
app.use("/api/v1/movies/:movie_id/comments", commentByMovieRouter);
app.use("/api/v1/users/:user_id/comments", commentByAccountRouter);

// For any route not handled above, serve React's index.html (for SPA routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// ERROR
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 400));
});

app.use(globalErrHandler);

module.exports = app;
