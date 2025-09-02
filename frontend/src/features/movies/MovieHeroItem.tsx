/** @format */

import { Link } from "react-router-dom";
import {
  MovieDetailsProps,
  MovieSimplifyProps,
} from "../../interfaces/movieInterfaces";
import RatingRuntime from "../../ui/movies/RatingRuntime.tsx";

import { FaCalendar } from "react-icons/fa";

import { ReactNode } from "react";

interface MovieHeroItemProps extends MovieSimplifyProps {
  children?: ReactNode;
}

// movie hero img
const Img: React.FC<MovieSimplifyProps> = ({ movie }) => {
  return (
    <img
      src={movie.poster}
      alt={movie.title}
      className="xs:mb-24 h-[40rem] min-w-[25rem] rounded-lg shadow-md z-10"
    />
  );
};

// text container
const MovieHeroTxtContainer: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative z-10 flex items-center gap-6 w-full">
      <div className="flex flex-col gap-3 text-white bg-gradient-to-r from-gray-800/90 to-transparent p-6 rounded-lg max-w-3xl">
        {children}
      </div>
    </div>
  );
};

// for hero in homepage (summary)
export const MovieHeroSummary: React.FC<MovieSimplifyProps> = ({ movie }) => {
  return (
    <MovieHeroTxtContainer>
      <h2 className="big-movie-title">{movie.title}</h2>
      <RatingRuntime movie={movie} />
      <p className="text-2xl text-gray-200 leading-relaxed">{movie.plot}</p>

      {/* cta btn */}
      {/* <Button type="primary"> */}
      <Link to={`movie/${movie.slug}`} className="primary-btn btn">
        Explore now
      </Link>
      {/* </Button> */}
    </MovieHeroTxtContainer>
  );
};

// for hero in movie detail
export const MovieHeroDetail: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <MovieHeroTxtContainer>
      <h2 className="big-movie-title">{movie.title}</h2>
      <RatingRuntime movie={movie}>
        <span className="flex gap-1 items-center">
          <FaCalendar /> {movie.year}
        </span>
      </RatingRuntime>

      {/* genres */}
      <div>Genres: {movie.genres.join(", ")}</div>

      {/* rated */}
      <div>Rated: {movie.rated}</div>
    </MovieHeroTxtContainer>
  );
};

// movie hero (pass the text as children)
export const MovieHeroItem: React.FC<MovieHeroItemProps> = ({
  movie,
  children,
}) => {
  return (
    <div
      className="relative w-4/5 mx-auto flex items-center gap-6 p-6 rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url(${movie.poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-gray-800/60 backdrop-blur-sm" />

      <Img movie={movie} />
      {children}
    </div>
  );
};
