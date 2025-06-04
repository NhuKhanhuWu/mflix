/** @format */

import { useMutation } from "@tanstack/react-query";
import { requestOtp } from "../api/auth/requestOtp";
import { submitOtp } from "../api/auth/submitOtp";
import { signup } from "../api/auth/signup";

export function useSendOtpRequest() {
  return useMutation({
    mutationFn: ({ email }: { email: string }) => requestOtp(email),
  });
}

export function useSubmitOtp() {
  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      submitOtp(email, otp),
  });
}

interface signUpProps {
  name: string;
  password: string;
  passwordConfirm: string;
  jwt: string;
}

export function useSignUp() {
  return useMutation({
    mutationFn: (data: signUpProps) => signup(data),
  });
}
