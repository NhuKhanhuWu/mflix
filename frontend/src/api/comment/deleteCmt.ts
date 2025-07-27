/** @format */

import axios from "axios";
import errorHandler from "../errorHandler";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function deleteCmt(cmt_id: string, token: string) {
  try {
    // Fetch data from API
    const res = await axios.delete(`${BASE_URL}/comments/${cmt_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err: unknown) {
    errorHandler(err);
  }
}
