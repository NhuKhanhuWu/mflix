/** @format */
import { Dispatch, SetStateAction } from "react";
import {
  Genres,
  YearRelease,
  Search,
  ImdbScore,
  Runtime,
  Sort,
  SubmitBtn,
  CloseBtn,
  ClearBtn,
} from "./MovieFilterComponents";

import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../api/getGenre";
import { useForm, UseFormRegister } from "react-hook-form";

export interface MovieFilterProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface FilterFormValues {
  title?: string;
  genres?: string[];
  match?: "any" | "all";
  yearFrom?: number;
  yearTo?: number;
  imdbScore?: string;
  runtime?: "<90" | "90-120" | ">120";
  sort?: "latest" | "alphabet";
}

export interface InputRegisterProps {
  register: UseFormRegister<FilterFormValues>;
}

const defaultValues = {
  title: "",
  genres: [],
  match: "any",
  yearFrom: "",
  yearTo: "",
  imdbScore: "4",
  runtime: "<90",
  sort: "latest",
};

const DesktopFilter: React.FC<MovieFilterProps> = ({ setOpen }) => {
  const { register, handleSubmit, reset } = useForm<FilterFormValues>({
    defaultValues: defaultValues,
  });

  function handleSubmit(data: FilterFormValues) {
    console.log("Applied filters:", data);
    // setOpen(false);
  }

  const { data: genres, isLoading: isLoadingGenres } = useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres({ limit: 25, page: 1, sortBy: "alphabet" }),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="relative w-[80vw] max-h-[80vh]"
        style={{ backgroundColor: "rgb(48, 48, 48)", color: "white" }}>
        {/* Blur Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

        {/* modal content */}
        <form
          onSubmit={handleSubmit(handleSubmit)}
          className="relative z-10 w-full h-full overflow-y-auto p-4 rounded-xl shadow-md grid grid-cols-2 gap-5"
          style={{ backgroundColor: "rgb(48, 48, 48)", color: "white" }}>
          <div className="flex flex-col gap-5">
            {/* title */}
            <Search register={register} />

            {/* Genres */}
            <Genres
              register={register}
              genres={genres}
              isLoading={isLoadingGenres}
            />
          </div>

          <div className="flex flex-col gap-5">
            {/* Year Release */}
            <YearRelease register={register} />

            {/* IMDb Score */}
            <ImdbScore register={register} />

            {/* Runtime */}
            <Runtime register={register} />

            {/* Sort By */}
            <Sort register={register} />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <SubmitBtn onSubmit={handleSubmit} />
            <CloseBtn setOpen={setOpen} />
            <ClearBtn reset={reset} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DesktopFilter;
