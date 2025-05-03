/** @format */

import { Link } from "react-router-dom";
import { MovieProps } from "../../interfaces/movieInterfaces";
import RatingRuntime from "../../ui/RatingRuntime";

const Img: React.FC<MovieProps> = ({ movie }) => {
  return (
    <img
      src={movie.poster}
      alt={movie.title}
      className="h-[40rem] min-w-[25rem] rounded-lg shadow-md z-10"
    />
  );
};

const Text: React.FC<MovieProps> = ({ movie }) => {
  return (
    <div className="relative z-10 flex items-center gap-6 w-full">
      <div className="flex flex-col gap-3 text-white bg-gradient-to-r from-gray-800/90 to-transparent p-6 rounded-lg max-w-3xl">
        <h2 className="text-5xl font-bold mb-2 uppercase">{movie.title}</h2>
        <RatingRuntime movie={movie} />
        <p className="text-2xl text-gray-200 leading-relaxed">{movie.plot}</p>

        {/* cta btn */}
        {/* <Button type="primary"> */}
        <Link to={`movies/${movie.slug}`} className="primary-btn btn">
          Explore now
        </Link>
        {/* </Button> */}
      </div>
    </div>
  );
};

export const MovieHeroItem: React.FC<MovieProps> = ({ movie }) => {
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
      <Text movie={movie} />
    </div>
  );
};
