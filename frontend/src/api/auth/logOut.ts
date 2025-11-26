/** @format */

import axios from "axios";
import errorHandler from "../errorHandler";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function logOut() {
  try {
    // Fetch data from API
    const res = await axios.post(
      `${BASE_URL}/users/logout`,
      {},
      { withCredentials: true }
    );

    return res.data;
  } catch (err: unknown) {
    errorHandler(err);
  }
}
