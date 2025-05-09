/** @format */
interface movieByGenresProps {
  genre: string;
  limit?: number;
  page?: number;
}

// movies
export const get5PopularMovieQuery = "/most_rated?limit=5";
export const get5BestMovieQuery = "?limit=5&sort=-rating";
export const get5LatestMovieQuery = "?sort=-year&limit=5";
export const getMovieByGenresQuery = ({
  genre,
  limit = 5,
  page = 1,
}: movieByGenresProps) => `?genres=${genre}&limit=${limit}&page=${page}`;

// genres
export const getTopPopularGenreQuery = "";
