/** @format */

import axios from "axios";
import errorHandler from "../errorHandler";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function updateCmt(cmt_id: string, text: string, token: string) {
  try {
    // Fetch data from API
    const res = await axios.patch(
      `${BASE_URL}/comments/${cmt_id}`,
      {
        text: text,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data;
  } catch (err: unknown) {
    errorHandler(err);
  }
}
