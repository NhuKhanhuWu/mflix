/** @format */

import axios from "axios";
import errorHandler from "../errorHandler";
import Cookies from "js-cookie";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export interface ChangePasswordArgs {
  currPassword: string;
  password: string;
  passwordConfirm: string;
}

export async function changePassword({
  currPassword,
  password,
  passwordConfirm,
}: ChangePasswordArgs) {
  const loginToken = Cookies.get("accessToken");

  try {
    // Fetch data from API
    const response = await axios.patch(
      `${BASE_URL}/users/changePassword`,
      {
        currPassword,
        password,
        passwordConfirm,
      },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${loginToken}` },
      }
    );
    const accessToken = response.data.accessToken;

    if (accessToken) Cookies.set("accessToken", accessToken);

    return response.data;
  } catch (err: unknown) {
    errorHandler(err);
  }
}
