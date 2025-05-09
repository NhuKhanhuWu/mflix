/** @format */

import axios from "axios";
// import { PaginationParams } from "../interfaces/general";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function getMovieList(query: string) {
  try {
    // Fetch data from API
    const response = await axios.get(`${BASE_URL}movies${query}`);

    console.log(`${BASE_URL}movies?${query}`);

    return {
      movies: response.data.data,
      totalPage: response.data.totalPages,
      totalResults: response.data.totalResult,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error occurred");
  }
}
