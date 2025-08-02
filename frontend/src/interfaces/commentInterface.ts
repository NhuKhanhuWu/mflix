/** @format */

interface Cmt {
  _id: string;
  movie_id: string;
  text: string;
  date: string;
  user_id: string;
}

export interface CmtByMovie extends Cmt {
  user: {
    name: string;
    avatar: string;
  };
}

export interface CmtByUser extends Cmt {
  movie: {
    title: string;
    slug: string;
    poster: string;
  };
}

export interface CommentPage {
  data: CmtByMovie[]; // list of comments
  totalResult: number; // total number of comments
  totalPages: number; // total number of pages
}

export interface CmtByMovieProps {
  comment: CmtByMovie;
}

export interface CmtByUserProps {
  comment: CmtByUser;
}

export interface CmtList<T> {
  totalResult: number;
  totalPages: number;
  data: T[];
}
