/** @format */

import axios from "axios";
import errorHandler from "../errorHandler";
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

interface signUpProps {
  jwt: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

export async function signup({
  jwt,
  name,
  password,
  passwordConfirm,
}: signUpProps) {
  try {
    const res = await axios.post(
      `${BASE_URL}/users/signup`,
      {
        name: name,
        password: password,
        passwordConfirm: passwordConfirm,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    errorHandler(err);
  }
}
