/** @format */
interface movieByGenresProps {
  genre: string;
  limit?: number;
  page?: number;
}

// movies
export const get5PopularMovieQuery = "movies/most_rated?limit=5";
export const get5BestMovieQuery = "movies?limit=5&sort=-rating";
export const get5LatestMovieQuery = "movies?sort=-year&limit=5";
export const getMovieByGenresQuery = ({
  genre,
  limit = 5,
  page = 1,
}: movieByGenresProps) => `movies?genres=${genre}&limit=${limit}&page=${page}`;

// genres
export const getTopPopularGenreQuery = "";
