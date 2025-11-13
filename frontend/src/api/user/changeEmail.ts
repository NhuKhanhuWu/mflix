/** @format */

import axios from "axios";
import errorHandler from "../errorHandler";
import Cookies from "js-cookie";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

// send change email request => send confirm link
export async function changeEmailRequest(email: string, password: string) {
  const loginToken = Cookies.get("loginToken");

  try {
    // Fetch data from API
    const res = await axios.post(
      `${BASE_URL}/users/changeEmail`,
      {
        email,
        password,
      },
      {
        headers: { Authorization: `Bearer ${loginToken}` },
      }
    );

    return res.data;
  } catch (err: unknown) {
    errorHandler(err);
  }
}

// change the email after user confirm
export async function changeEmail(token?: string) {
  try {
    // Fetch data from API
    const res = await axios.patch(
      `${BASE_URL}/users/changeEmailConfirm`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data;
  } catch (err: unknown) {
    errorHandler(err);
  }
}
