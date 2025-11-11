/** @format */

import { Link } from "react-router-dom";
import { MovieSimplifyProps } from "../../interfaces/movieInterfaces";
import RatingRuntime from "../../ui/movies/RatingRuntime.tsx";

const Img: React.FC<MovieSimplifyProps> = ({ movie }) => {
  return (
    <img
      src={movie.poster}
      alt={movie.title}
      className="w-auto min-w-[24rem] h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
    />
  );
};

const Text: React.FC<MovieSimplifyProps> = ({ movie }) => {
  return (
    <div
      className="absolute bottom-0 w-full p-4 text-white"
      style={{
        background:
          "linear-gradient(360deg, rgb(50, 50, 50), rgb(0 0 0 / 10%))",
      }}>
      {/* title */}
      <Link
        to={`/movie/${movie.slug}`}
        className="text-[2rem] font-bold uppercase hover:text-[#df2144c3] transition-all duration-300">
        {movie.title}
      </Link>

      {/* rating & runtime */}
      <RatingRuntime movie={movie} />

      {/* plot */}
      <p className="text-[1.4rem] mt-2 max-h-[4.5rem] hover:max-h-[1000px] overflow-hidden transition-all duration-800">
        {movie.plot}
      </p>
    </div>
  );
};

const MovieCard: React.FC<MovieSimplifyProps> = ({ movie }) => {
  return (
    <div className="relative w-fit h-[30rem] overflow-hidden rounded-lg group">
      <Img movie={movie} />
      <Text movie={movie} />
    </div>
  );
};

export default MovieCard;
