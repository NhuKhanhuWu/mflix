/** @format */

export interface Comment {
  _id: string;
  movie_id: string;
  text: string;
  date: string; // or use Date if you plan to convert it
  user_id: {
    _id: string;
    name: string;
    avartar: string;
  };
}
export interface CommentProps {
  comment: Comment;
}

export interface CommnentList {
  totalResult: number;
  totalPages: number;
  data: Comment[];
}
