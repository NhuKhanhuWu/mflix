/** @format */

import axios from "axios";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function getCommentByMovie(id?: string, page?: number) {
  try {
    // Fetch data from API
    const response = await axios.get(
      `${BASE_URL}/comments?movie_id=${id}&page=${page}`
    );

    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error occurred");
  }
}
