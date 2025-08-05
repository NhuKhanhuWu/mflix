/** @format */

import axios from "axios";
import errorHandler from "../errorHandler";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export async function submitOtp(email: string, otp: string) {
  try {
    const res = await axios.post(`${BASE_URL}/users/checkOtp`, {
      email: email,
      otp: otp,
    });

    return res.data;
  } catch (err) {
    errorHandler(err);
  }
}
