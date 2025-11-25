/** @format */

import axios from "axios";
import errorHandler from "../errorHandler";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function login(email: string, password: string) {
  try {
    // Fetch data from API
    const res = await axios.post(
      `${BASE_URL}/users/login`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );

    return res.data;
  } catch (err: unknown) {
    errorHandler(err);
  }
}
