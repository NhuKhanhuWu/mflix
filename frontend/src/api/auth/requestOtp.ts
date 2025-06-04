/** @format */

import axios from "axios";
import errorHandler from "../errorHandler";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function requestOtp(email: string) {
  try {
    const res = await axios.post(`${BASE_URL}/users/sendSignupOtp`, {
      email: email,
    });

    return res.data;
  } catch (err) {
    errorHandler(err);
  }
}
