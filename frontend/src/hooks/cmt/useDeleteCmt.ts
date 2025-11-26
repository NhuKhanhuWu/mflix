/** @format */

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCmt } from "../../api/comment/deleteCmt";

interface deleteCmtProps {
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

interface cmtProps {
  cmt_id: string;
}

export function useDeleteCmt({ setIsDeleting }: deleteCmtProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cmt_id }: cmtProps) => deleteCmt(cmt_id),
    onSuccess: () => {
      setIsDeleting(false);
      queryClient.invalidateQueries({
        queryKey: ["comments"],
        exact: false,
      });
    },
  });
}
