/** @format */

import axios from "axios";
import errorHandler from "../errorHandler";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function createNewCmt(
  movie_id: string,
  text: string,
  token: string
) {
  try {
    // Fetch data from API
    const res = await axios.post(
      `${BASE_URL}/comments`,
      {
        movie_id: movie_id,
        text: text,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data;
  } catch (err: unknown) {
    errorHandler(err);
  }
}
