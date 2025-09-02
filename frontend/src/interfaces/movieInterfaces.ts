/** @format */

export interface MovieSimplify {
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

export interface MovieSimplifyProps {
  movie: MovieSimplify;
}

export interface MovieListProps {
  header?: React.ReactNode;
  // cols?: number;
  queryKey: unknown[];
  queryFn: () => Promise<{
    movies: MovieSimplify[];
    totalPage: number;
    totalResults: number;
  }>;
}

export interface TomatosProps {
  viewer?: {
    rating: number;
    numReviews: number;
    meter: number;
  };
  critic?: {
    rating: number;
    numReviews: number;
    meter: number;
  };
  dvd: string;
  lastUpdated: string;
  rotten: number;
  production: string;
  fresh: number;
}

export interface MovieDetails extends MovieSimplify {
  fullplot: string;
  rated: string;
  year: number;
  released: string;
  lastupdated: string;
  num_mflix_comments: number;
  type: string;

  cast?: string[];
  languages: string[];
  countries: string[];
  directors: string[];
  writers: string[];

  awards: {
    wins: number;
    nominations: number;
    text: string;
  };

  metacritic?: number;
  tomatoes?: TomatosProps;
}

export interface MovieDetailsProps {
  movie: MovieDetails;
}
