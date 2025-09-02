/** @format */

import { useQuery } from "@tanstack/react-query";
import { MovieListProps } from "../../interfaces/movieInterfaces";
import LoadAndErr from "../../ui/common/Spinner";
import MovieCard from "./MovieCard";
import EmptyResult from "../../ui/common/EmptyResult";
import { useBreakpoints } from "../../hooks/useBreakPoints";

const MovieList: React.FC<MovieListProps> = ({ header, queryKey, queryFn }) => {
  const {
    data: moviesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn,
  });
  const { isDesktop } = useBreakpoints();
  const movieList = isDesktop
    ? moviesData?.movies.slice(0, 5)
    : moviesData?.movies;

  if (moviesData?.movies.length === 0) return <EmptyResult />;

  return (
    <div>
      {header}

      <LoadAndErr isLoading={isLoading} isError={isError} />

      <div className="grid gap-4 overflow-hidden lg:mx-4 lg:grid-cols-5 sm:grid-cols-2 sm:m-auto sm:w-fit sm:gap-x-12 sm:gap-y-6">
        {movieList?.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
