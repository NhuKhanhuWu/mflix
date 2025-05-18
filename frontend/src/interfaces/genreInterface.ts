/** @format */

export interface Genre {
  _id: string;
  count: number;
}

export interface GenreProps {
  genre: Genre;
}

export interface GenreListProps {
  genres: Genre[];
  isLoading: boolean;
  isError?: boolean;
}
