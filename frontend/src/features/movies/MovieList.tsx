/** @format */

import { MovieListProps } from "../../interfaces/movieInterfaces";
import LoadAndErr from "../../ui/Spinner";
import MovieCard from "./MovieCard";

const MovieList: React.FC<MovieListProps> = ({
  movies,
  isLoading,
  header,
  isError = false,
}) => {
  return (
    <div>
      {header}

      {/* loading/err message */}
      <LoadAndErr isLoading={isLoading} isError={isError} />

      {/* movies */}
      <div className="grid grid-cols-5 gap-4 mx-4">
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
