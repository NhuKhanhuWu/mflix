/** @format */

import axios from "axios";
import { CommentPage } from "../../interfaces/commentInterface";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

interface getCommentByMovieProps {
  movie_id: string;
  page: number;
  user_id?: string;
}

export async function getCommentByMovie({
  movie_id: id,
  page,
  user_id,
}: getCommentByMovieProps): Promise<CommentPage> {
  try {
    // Fetch data from API
    const response = await axios.get(
      `${BASE_URL}/comments?movie_id=${id}&page=${page}&user_id=${
        user_id ?? ""
      }`
    );

    return response.data as CommentPage;
  } catch (err: unknown) {
    throw new Error(
      err instanceof Error ? err.message : "Unknown error occurred"
    );
  }
}
