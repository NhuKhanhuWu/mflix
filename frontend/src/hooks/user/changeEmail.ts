/** @format */

import { useMutation } from "@tanstack/react-query";
import { changeEmail, changeEmailRequest } from "../../api/user/changeEmail";

interface changeEmailProps {
  email: string;
  password: string;
}

export function useChangeEmailReq() {
  return useMutation({
    mutationFn: ({ email, password }: changeEmailProps) =>
      changeEmailRequest(email, password),
  });
}

export function useChangeEmail() {
  return useMutation({
    mutationFn: ({ token }: { token?: string }) => changeEmail(token),
  });
}
