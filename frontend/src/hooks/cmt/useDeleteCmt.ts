/** @format */

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCmt } from "../../api/comment/deleteCmt";

interface deleteCmtProps {
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

interface cmtProps {
  cmt_id: string;
  token: string;
}

export function useDeleteCmt({ setIsDeleting }: deleteCmtProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cmt_id, token }: cmtProps) => deleteCmt(cmt_id, token),
    onSuccess: () => {
      setIsDeleting(false);
      queryClient.invalidateQueries({
        queryKey: ["comments"],
        exact: false,
      });
    },
  });
}
