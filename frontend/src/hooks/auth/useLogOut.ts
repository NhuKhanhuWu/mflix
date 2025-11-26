/** @format */

import { useMutation } from "@tanstack/react-query";
import { logOut } from "../../api/auth/logOut";

export function useLogOut() {
  return useMutation({
    mutationFn: () => logOut(),
  });
}
