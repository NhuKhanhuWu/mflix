/** @format */

import { FaClock, FaStar } from "react-icons/fa";
import { MovieProps } from "../interfaces/movieInterfaces";

const RatingRuntime: React.FC<MovieProps> = ({ movie }) => {
  return (
    <div className="flex items-center gap-4 text-2xl mt-1">
      <span className="flex items-center gap-1">
        <FaStar className="text-yellow-400" /> {movie?.imdb?.rating}
      </span>
      {movie.runtime && (
        <span className="flex items-center gap-1">
          <FaClock /> {movie.runtime} min
        </span>
      )}
    </div>
  );
};

export default RatingRuntime;
