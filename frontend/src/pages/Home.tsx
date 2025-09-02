/** @format */

import { useQuery } from "@tanstack/react-query";

import SectionHeader from "../ui/common/SectionHeader";
import Space from "../ui/common/Space";
import { ContentBlock } from "../ui/blocks/ContentBlock";

import { getMovieList } from "../api/movie/getMovieList";
import { getGenres } from "../api/genres/getGenre";

import MovieList from "../features/movies/MovieList";
import PopularGernes from "../features/genres/PopularGenres";

import {
  get6BestMovieQuery,
  get6LatestMovieQuery,
  get6PopularMovieQuery,
  getMovieByGenresQuery,
} from "../constaint/queryString";
import { Link } from "react-router-dom";
import HeroSection from "../features/movies/HeroSection";

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
        queryKey={["5PopularMovie"]}
        queryFn={() => getMovieList(get6PopularMovieQuery)}
      />
      <Summary />

      {/* best movies */}
      <MovieList
        header={<SectionHeader title="best rated" />}
        queryFn={() => getMovieList(get6LatestMovieQuery)}
        queryKey={["5LatestMovie"]}
      />
      <Space space="5rem"></Space>

      {/* latest movies */}
      <MovieList
        header={<SectionHeader title="latest movie" />}
        queryKey={["5BestMovie"]}
        queryFn={() => getMovieList(get6BestMovieQuery)}
      />

      {/* genres */}
      <PopularGernes
        genres={genres}
        isLoading={isLoadingGenres}
        isError={isGenresErr}
      />

      {/* short movies */}
      <MovieList
        header={<SectionHeader title="short movies" />}
        queryKey={["5ShortMovie"]}
        queryFn={() =>
          getMovieList(getMovieByGenresQuery({ genre: "Short", page: 1 }))
        }
      />
      <Space space="5rem"></Space>

      {/* romance movies */}
      <MovieList
        header={<SectionHeader title="romance movies" />}
        queryKey={["5RomanceMovie"]}
        queryFn={() =>
          getMovieList(getMovieByGenresQuery({ genre: "Romance", page: 1 }))
        }
      />
      <Space space="5rem"></Space>

      {/* musical movies */}
      <MovieList
        header={<SectionHeader title="musical movies" />}
        queryKey={["5MusicalMovie"]}
        queryFn={() =>
          getMovieList(getMovieByGenresQuery({ genre: "Musical", page: 1 }))
        }
      />

      <TheaterSummary></TheaterSummary>
    </>
  );
}

export default Home;
