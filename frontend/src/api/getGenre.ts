/** @format */

import axios from "axios";
import { PaginationParams } from "../interfaces/general";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

interface getGenresProps extends PaginationParams {
  sortBy?: "popular" | "alphabet";
}

export async function getGenres({
  page,
  limit,
  sortBy = "popular",
}: getGenresProps) {
  try {
    // Fetch data from API
    const response = await axios.get(
      `${BASE_URL}genres?limit=${limit}&page=${page}&sortBy=${sortBy}`
    );

    return response.data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error occurred");
  }
}
