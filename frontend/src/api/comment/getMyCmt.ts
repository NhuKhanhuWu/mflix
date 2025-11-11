/** @format */

import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function getMyCmt() {
  const token = Cookies.get("loginToken");

  try {
    // Fetch data from API
    const response = await axios.get(`${BASE_URL}/comments/my-comments`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (err: unknown) {
    throw new Error(
      err instanceof Error ? err.message : "Unknown error occurred"
    );
  }
}
