/** @format */

import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  ChangePasswordArgs,
} from "../../api/user/changePassword";

export function useChangePassword() {
  return useMutation({
    mutationFn: ({
      currPassword,
      password,
      passwordConfirm,
    }: ChangePasswordArgs) =>
      changePassword({
        currPassword,
        password,
        passwordConfirm,
      }),
  });
}
