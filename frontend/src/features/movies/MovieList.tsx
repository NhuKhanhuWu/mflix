/** @format */

import { useQuery } from "@tanstack/react-query";
import { MovieListProps } from "../../interfaces/movieInterfaces";
import LoadAndErr from "../../ui/common/Spinner";
import MovieCard from "./MovieCard";
import EmptyResult from "../../ui/common/EmptyResult";

const MovieList: React.FC<MovieListProps> = ({
  header,
  cols = 5,
  queryKey,
  queryFn,
}) => {
  const {
    data: moviesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn,
  });

  if (moviesData?.movies.length === 0) return <EmptyResult />;

  return (
    <div>
      {header}

      <LoadAndErr isLoading={isLoading} isError={isError} />

      <div
        className="grid gap-4 mx-4"
        style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}>
        {moviesData?.movies?.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
