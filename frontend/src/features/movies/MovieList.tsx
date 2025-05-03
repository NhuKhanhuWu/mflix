/** @format */

import { MovieListProps } from "../../interfaces/movieInterfaces";
import Spinner from "../../ui/Spinner";
import MovieCard from "./MovieCard";

const MovieList: React.FC<MovieListProps> = ({ movies, isLoading, header }) => {
  if (isLoading) return <Spinner />;

  return (
    <div>
      {header}

      <div className="grid grid-cols-5 gap-4 mx-4">
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
