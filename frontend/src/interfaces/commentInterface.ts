/** @format */

export interface Comment {
  _id: string;
  movie_id: string;
  text: string;
  date: string; // or use Date if you plan to convert it
  user_id: string;
  user: {
    name: string;
    avatar: string;
  };
}

export interface CommentPage {
  data: Comment[]; // list of comments
  totalResult: number; // total number of comments
  totalPages: number; // total number of pages
}

export interface CommentProps {
  // text: string | undefined;
  comment: Comment;
}

export interface CommnentList {
  totalResult: number;
  totalPages: number;
  data: Comment[];
}
