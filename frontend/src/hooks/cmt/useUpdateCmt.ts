/** @format */

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { updateCmt } from "../../api/comment/updateCmt";

interface updateCmtProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

interface cmtProps {
  cmt_id: string;
  text: string;
  token: string;
}

export function useUpdateCmt({ setIsEditing }: updateCmtProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cmt_id, text, token }: cmtProps) =>
      updateCmt(cmt_id, text, token),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: ["comments"],
        exact: false,
      });
    },
  });
}
