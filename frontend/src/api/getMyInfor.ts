/** @format */

import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function getMyInfor() {
  const loginToken = Cookies.get("loginToken");

  try {
    // Fetch data from API
    const response = await axios.post(
      `${BASE_URL}/users/me`,
      {},
      {
        headers: { Authorization: `Bearer ${loginToken}` },
      }
    );

    return response.data.user;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error occurred");
  }
}
