/** @format */
interface movieByGenresProps {
  genre?: string;
  limit?: number;
  page?: number;
}

// movies
export const get6PopularMovieQuery = "sort=popular&limit=6";
export const get6BestMovieQuery = "limit=6&sort=-rating";
export const get6LatestMovieQuery = "sort=-year&limit=6";
export const getMovieByGenresQuery = ({
  genre,
  limit = 6,
  page = 1,
}: movieByGenresProps) => `genres=${genre}&limit=${limit}&page=${page}`;

// genres
export const getTopPopularGenreQuery = "";
