/** @format */

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import { createNewCmt } from "../../api/comment/createNewCmt";

interface newCmtProps {
  movie_id: string;
  text: string;
}

interface hookProps {
  reset: UseFormReset<{ text: string }>;
  movieId: string;
}

export function useNewCmt({ reset, movieId }: hookProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ movie_id, text }: newCmtProps) =>
      createNewCmt(movie_id, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", movieId] });
      reset();
    },
  });
}
