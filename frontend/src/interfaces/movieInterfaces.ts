/** @format */

import { ReactElement } from "react";

export interface Movie {
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  _id: string;
  plot: string;
  genres: string[];
  poster: string;
  title: string;
  slug: string;
  id: string;
  runtime: number;
}

export interface MovieProps {
  movie: Movie;
}

export interface MovieListProps {
  movies: Movie[];
  isLoading: boolean;
  isError?: boolean;
  header?: ReactElement;
}
