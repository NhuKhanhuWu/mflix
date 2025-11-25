/** @format */

import axios from "axios";
import Cookies from "js-cookie";
import errorHandler from "../errorHandler";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function createNewCmt(movie_id: string, text: string) {
  try {
    const token = Cookies.get("accessToken");

    // Fetch data from API
    const response = await axios.post(
      `${BASE_URL}/comments`,
      {
        movie_id: movie_id,
        text: text,
      },
      { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
    );
    const accessToken = response.data.accessToken;

    if (accessToken) Cookies.set("accessToken", accessToken);

    return response.data;
  } catch (err: unknown) {
    errorHandler(err);
  }
}
