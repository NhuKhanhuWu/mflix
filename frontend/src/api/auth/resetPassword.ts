/** @format */

import axios from "axios";
import errorHandler from "../errorHandler";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

interface resetPasswordProps {
  token?: string;
  password: string;
  passwordConfirm: string;
}

export async function resetPassword({
  token,
  password,
  passwordConfirm,
}: resetPasswordProps) {
  try {
    // Fetch data from API
    const res = await axios.patch(
      `${BASE_URL}/users/resetPassword`,
      {
        password: password,
        passwordConfirm: passwordConfirm,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    errorHandler(err);
  }
}
