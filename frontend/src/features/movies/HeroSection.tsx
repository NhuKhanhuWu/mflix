/** @format */

import { useQuery } from "@tanstack/react-query";
import { MovieListProps } from "../../interfaces/movieInterfaces";
import CustomCarousel from "../../ui/CustomCarousel";
import LoadAndErr from "../../ui/Spinner";
import { MovieHeroItem, MovieHeroSummary } from "./MovieHeroItem";

const HeroSection: React.FC<MovieListProps> = ({ queryKey, queryFn }) => {
  const {
    data: moviesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn,
  });

  return (
    <>
      <LoadAndErr isLoading={isLoading} isError={isError} />
      <CustomCarousel>
        {moviesData?.movies?.map((movie) => (
          <MovieHeroItem movie={movie} key={movie.slug}>
            <MovieHeroSummary movie={movie} />
          </MovieHeroItem>
        ))}
      </CustomCarousel>
    </>
  );
};

export default HeroSection;
