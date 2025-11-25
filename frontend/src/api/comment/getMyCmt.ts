/** @format */

import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function getMyCmt() {
  const token = Cookies.get("accessToken");

  try {
    // Fetch data from API
    const response = await axios.get(`${BASE_URL}/comments/my-comments`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    const accessToken = response.data.accessToken;

    if (accessToken) Cookies.set("accessToken", accessToken);

    return response.data;
  } catch (err: unknown) {
    throw new Error(
      err instanceof Error ? err.message : "Unknown error occurred"
    );
  }
}
