/** @format */

import { FaClock, FaStar } from "react-icons/fa";
import { MovieSimplifyProps } from "../interfaces/movieInterfaces";
import { ReactNode } from "react";

interface RatingRuntimeProps extends MovieSimplifyProps {
  children?: ReactNode;
}

const RatingRuntime: React.FC<RatingRuntimeProps> = ({ movie, children }) => {
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
      {children}
    </div>
  );
};

export default RatingRuntime;
