/** @format */

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { createNewCmt } from "../api/comment/createNewCmt";
import { UseFormReset } from "react-hook-form";

interface newCmtProps {
  movie_id: string;
  text: string;
  token: string;
}

interface hookProps {
  reset: UseFormReset<{ text: string }>;
  movieId: string;
}

export function useNewCmt({ reset, movieId }: hookProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ movie_id, text, token }: newCmtProps) =>
      createNewCmt(movie_id, text, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", movieId] });
      reset();
    },
  });
}
