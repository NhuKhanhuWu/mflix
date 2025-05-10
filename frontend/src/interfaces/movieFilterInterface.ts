/** @format */

import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

export interface MovieFilterProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface FilterFormProps {
  title?: string;
  genres?: string[];
  match?: "any" | "all";
  imdbScore?: string;
  runtime:
    | "runtime[lt]=90"
    | "runtime[gte]=90&runtime[lte]=120"
    | "runtime[gt]=120"
    | "";
  sort?: "-year" | "-rating" | "-title" | "title";
  page: number;
}

export interface InputRegisterProps {
  register: UseFormRegister<FilterFormProps>;
}
