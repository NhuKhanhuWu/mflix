/** @format */

import axios from "axios";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function getMovieDetail(slug: string) {
  try {
    // Fetch data from API
    const response = await axios.get(`${BASE_URL}movies/slug/${slug}`);

    return response.data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error occurred");
  }
}
