/** @format */

import { useQuery } from "@tanstack/react-query";

import CustomCarousel from "../ui/CustomCarousel";
import SectionHeader from "../ui/SectionHeader";
import Space from "../ui/Space";
import { ContentBlock } from "../ui/ContentBlock";

import { getMovieList } from "../api/getMovieList";
import { getGenres } from "../api/getGenre";

import { MovieHeroItem } from "../features/movies/MovieHeroItem";
import MovieList from "../features/movies/MovieList";
import PopularGernes from "../features/genres/PopularGenres";

import { MovieListProps } from "../interfaces/movieInterfaces";

import {
  get5BestMovieQuery,
  get5LatestMovieQuery,
  get5PopularMovieQuery,
  getMovieByGenresQuery,
} from "../constaint/queryString";
import { Link } from "react-router-dom";
import SpinnerAndErr from "../ui/Spinner";

const HeroSection: React.FC<MovieListProps> = ({
  movies,
  isLoading,
  isError,
}) => {
  // if (isLoading)
  //   return <SpinnerAndErr isLoading={isLoading} isError={isError} />;

  return (
    <>
      <SpinnerAndErr isLoading={isLoading} isError={isError} />
      <CustomCarousel>
        {movies?.map((movie) => (
          <MovieHeroItem movie={movie} key={movie.slug} />
        ))}
      </CustomCarousel>
    </>
  );
};

function Summary() {
  return (
    <ContentBlock title="about us">
      <div className="flex flex-col gap-4 items-center">
        <p>
          Welcome to <span className="highlight-txt-5xl">MFLIX</span> — your
          go-to destination for honest and insightful movie reviews. From the
          latest blockbusters to hidden indie gems, we break down films with
          in-depth analysis, ratings, and viewer opinions to help you decide
          what to watch next. Dive into a world of cinema through curated lists,
          trending trailers, and community-driven discussions.
        </p>

        <Link to="/about" className="btn primary-btn">
          Learn more
        </Link>
      </div>
    </ContentBlock>
  );
}

function TheaterSummary() {
  return (
    <ContentBlock title="theater">
      <div className="flex flex-col gap-4 items-center">
        <p>
          Discover theaters near you on the{" "}
          <span className="highlight-txt-5xl">MFLIX</span> website! Our "Explore
          Theaters" feature helps you quickly find local cinemas based on your
          location, complete with showtimes, movie selections, and directions.
          Whether you're planning a night out or looking for the closest
          screening, MFlix makes it easy to connect with theaters around you.
        </p>
        <Link to="/theaters" className="primary-btn btn">
          <Link to="theaters">Explore now</Link>
        </Link>
      </div>
    </ContentBlock>
  );
}

function Home() {
  const {
    data: top5PopularMovies,
    isLoading: isLoadingPopularMovie,
    isError: is5PopularErr,
  } = useQuery({
    queryKey: ["5PopularMovie"],
    queryFn: () => getMovieList(get5PopularMovieQuery),
  });

  const {
    data: top5LatestMovies,
    isLoading: isLoadingLatestMovie,
    isError: is5LatestErr,
  } = useQuery({
    queryKey: ["5LatestMovie"],
    queryFn: () => getMovieList(get5LatestMovieQuery),
  });

  const {
    data: top5BestMovies,
    isLoading: isLoadingBestMovie,
    isError: is5BestErr,
  } = useQuery({
    queryKey: ["5BestMovie"],
    queryFn: () => getMovieList(get5BestMovieQuery),
  });

  const {
    data: top5ShortMovie,
    isLoading: isLoadingShortMovie,
    isError: is5ShortErr,
  } = useQuery({
    queryKey: ["5ShortMovie"],
    queryFn: () =>
      getMovieList(
        getMovieByGenresQuery({ genre: "Short", limit: 5, page: 1 })
      ),
  });

  const {
    data: top5RomanceMovie,
    isLoading: isLoadingRomanceMovie,
    isError: is5RomanceErr,
  } = useQuery({
    queryKey: ["5RomanceMovie"],
    queryFn: () =>
      getMovieList(
        getMovieByGenresQuery({ genre: "Romance", limit: 5, page: 1 })
      ),
  });

  const {
    data: top5MusicalMovie,
    isLoading: isLoadingMusicalMovie,
    isError: is5MusicalErr,
  } = useQuery({
    queryKey: ["5MusicalMovie"],
    queryFn: () =>
      getMovieList(
        getMovieByGenresQuery({ genre: "Musical", limit: 5, page: 1 })
      ),
  });

  const {
    data: genres,
    isLoading: isLoadingGenres,
    isError: isGenresErr,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres({ page: 1, limit: 15 }),
  });

  return (
    <>
      <Space space="5rem"></Space>
      <HeroSection
        movies={top5PopularMovies?.movies}
        isLoading={isLoadingPopularMovie}
        isError={is5PopularErr}
      />
      <Summary />

      {/* best movie */}
      <MovieList
        movies={top5BestMovies?.movies}
        isLoading={isLoadingBestMovie}
        isError={is5BestErr}
        header={<SectionHeader title="best rated" />}></MovieList>
      <Space space="5rem"></Space>
      {/* latest movie */}
      <MovieList
        movies={top5LatestMovies?.movies}
        isLoading={isLoadingLatestMovie}
        isError={is5LatestErr}
        header={<SectionHeader title="latest movie" />}></MovieList>

      {/* genres */}
      <PopularGernes
        genres={genres}
        isLoading={isLoadingGenres}
        isError={isGenresErr}
      />

      {/* movie */}
      <MovieList
        movies={top5ShortMovie?.movies}
        isLoading={isLoadingShortMovie}
        isError={is5ShortErr}
        header={<SectionHeader title="short movies" />}></MovieList>
      <Space space="5rem"></Space>

      <MovieList
        movies={top5RomanceMovie?.movies}
        isLoading={isLoadingRomanceMovie}
        isError={is5RomanceErr}
        header={<SectionHeader title="romance movies" />}></MovieList>
      <Space space="5rem"></Space>

      <MovieList
        movies={top5MusicalMovie?.movies}
        isLoading={isLoadingMusicalMovie}
        isError={is5MusicalErr}
        header={<SectionHeader title="musical movies" />}></MovieList>

      <TheaterSummary></TheaterSummary>
    </>
  );
}

export default Home;
