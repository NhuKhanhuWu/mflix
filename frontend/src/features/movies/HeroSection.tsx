/** @format */

import { useQuery } from "@tanstack/react-query";
import { MovieListProps } from "../../interfaces/movieInterfaces";
import CustomCarousel from "../../ui/carousel/CustomCarousel";
import LoadAndErr from "../../ui/common/Spinner";
import { MovieHeroItem, MovieHeroSummary } from "./MovieHeroItem";
import { useBreakpoints } from "../../hooks/useBreakPoints";

const HeroSection: React.FC<MovieListProps> = ({ queryKey, queryFn }) => {
  const {
    data: moviesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn,
  });

  const { isSmMobile } = useBreakpoints();

  return (
    <>
      <LoadAndErr isLoading={isLoading} isError={isError} />
      <CustomCarousel>
        {moviesData?.movies?.map((movie) => (
          <MovieHeroItem movie={movie} key={movie.slug}>
            {!isSmMobile && <MovieHeroSummary movie={movie} />}
          </MovieHeroItem>
        ))}
      </CustomCarousel>
    </>
  );
};

export default HeroSection;
