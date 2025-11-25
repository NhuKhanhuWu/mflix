/** @format */

import axios from "axios";
import Cookies from "js-cookie";
import errorHandler from "../errorHandler";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function updateCmt(cmt_id: string, text: string) {
  const token = Cookies.get("accessToken");

  try {
    // Fetch data from API
    const response = await axios.patch(
      `${BASE_URL}/comments/${cmt_id}`,
      {
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
