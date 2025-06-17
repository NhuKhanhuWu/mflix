/** @format */

import axios from "axios";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

interface getCommentByMovieProps {
  movie_id?: string;
  page?: number;
  user_id?: string;
}

export async function getCommentByMovie({
  movie_id: id,
  page,
  user_id,
}: getCommentByMovieProps) {
  try {
    // Fetch data from API
    const response = await axios.get(
      `${BASE_URL}/comments?movie_id=${id}&page=${page}&logged_user=${user_id}`
    );

    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error occurred");
  }
}
