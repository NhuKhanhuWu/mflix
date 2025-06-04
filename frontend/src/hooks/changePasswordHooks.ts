/** @format */

import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/auth/forgotPassword";
import { resetPassword } from "../api/auth/resetPassword";

export function useForgotPassword() {
  return useMutation({
    mutationFn: ({ email }: { email: string }) => forgotPassword(email),
  });
}

interface useLoginProps {
  password: string;
  passwordConfirm: string;
  token?: string;
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ token, password, passwordConfirm }: useLoginProps) =>
      resetPassword({ token, password, passwordConfirm }),
  });
}
