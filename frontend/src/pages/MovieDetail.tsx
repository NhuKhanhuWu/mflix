/** @format */

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../api/getMovieDetail";
import {
  MovieHeroDetail,
  MovieHeroItem,
} from "../features/movies/MovieHeroItem";
import { MovieDetails } from "../interfaces/movieInterfaces";
import LoadAndErr from "../ui/Spinner";
import Space from "../ui/Space";
import {
  Awards,
  CastsAndCrew,
  Plot,
  Production,
} from "../features/movies/MovieDetailComponent";
import MovieComment from "../features/comments/MovieComment";
import MovieList from "../features/movies/MovieList";
import { getMovieList } from "../api/getMovieList";
import { getMovieByGenresQuery } from "../constaint/queryString";
import SectionHeader from "../ui/SectionHeader";

const CONTENT_LIST = [
  "movie-plot",
  "rating-award",
  "casts-crew",
  "production",
  "comments",
];

// Hero component to display the movie hero details or loading/error
const Hero: React.FC<{
  movieDetail?: MovieDetails;
  isLoading: boolean;
  isError: boolean;
}> = ({ movieDetail, isLoading, isError }) => (
  <>
    {movieDetail ? (
      <MovieHeroItem movie={movieDetail}>
        <MovieHeroDetail movie={movieDetail} />
      </MovieHeroItem>
    ) : (
      <LoadAndErr isLoading={isLoading} isError={isError} />
    )}
  </>
);

// Main MovieDetail component
function MovieDetail() {
  const { slug } = useParams();

  // Throw 404 error if no slug is provided
  if (!slug) throw new Response("", { status: 404 });

  const {
    data: movieDetail,
    isLoading,
    isError,
  } = useQuery<MovieDetails>({
    queryKey: [slug],
    queryFn: () => getMovieDetail(slug),
  });

  // Throw 404 error if no movie found
  if (movieDetail === null) throw new Response("", { status: 404 });

  // Show loading/error state
  if (isLoading || isError)
    return <LoadAndErr isLoading={isLoading} isError={isError} />;

  return (
    <>
      {/* Banner */}
      <Space space="3rem" />
      <Hero movieDetail={movieDetail} isLoading={isLoading} isError={isError} />

      {/* Plot */}
      <Space space="5rem" />
      <Plot movie={movieDetail} id={CONTENT_LIST[0]} />

      {/* Awards */}
      <Space space="5rem" />
      <Awards movie={movieDetail} id={CONTENT_LIST[1]} />

      {/* casts and crew */}
      <Space space="5rem" />
      <CastsAndCrew movie={movieDetail} id={CONTENT_LIST[2]} />

      {/* production */}
      <Space space="5rem" />
      <Production movie={movieDetail} id={CONTENT_LIST[3]} />

      {/* comment */}
      <Space space="5rem" />
      <div className="flex gap-5">
        <MovieComment
          sectionId={CONTENT_LIST[4]}
          movieId={movieDetail?.id || ""}
        />
        <MovieList
          header={<SectionHeader title="You may like" />}
          cols={2}
          queryKey={["Action"]}
          queryFn={() =>
            getMovieList(
              getMovieByGenresQuery({
                genre: movieDetail?.genres.join(","),
                limit: 12,
                page: 1,
              })
            )
          }
        />
      </div>
    </>
  );
}

export default MovieDetail;
