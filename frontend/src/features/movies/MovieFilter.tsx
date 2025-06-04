/** @format */
import {
  Genres,
  Search,
  Runtime,
  Sort,
  SubmitBtn,
  CloseBtn,
} from "./MovieFilterComponents";

import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../api/getGenre";
import { MovieFilterProps } from "../../interfaces/movieFilterInterface";
import { useMovieFilters } from "../../hooks/useMovieFilter";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { BaseSyntheticEvent } from "react";

const DesktopFilter: React.FC<MovieFilterProps> = ({ setOpen }) => {
  const { form, applyFilters } = useMovieFilters();
  const { register, handleSubmit } = form;

  const page = useSelector((state: RootState) => state.movieFilter.page);

  // genres list
  const {
    data: genres,
    isLoading: isLoadingGenres,
    isError: isGenresErr,
  } = useQuery({
    queryKey: ["genres", { limit: 50, page: 1, sortBy: "alphabet" }],
    queryFn: () => getGenres({ limit: 50, page: 1, sortBy: "alphabet" }),
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
          onSubmit={handleSubmit((data, e) =>
            applyFilters(data, e as BaseSyntheticEvent<object, any, any>)
          )}
          className="relative z-10 w-full h-full overflow-y-auto p-4 rounded-xl shadow-md grid grid-cols-2 gap-5"
          style={{ backgroundColor: "rgb(48, 48, 48)", color: "white" }}>
          {/* Genres */}
          <Genres
            register={register}
            genres={genres}
            isLoading={isLoadingGenres}
            isError={isGenresErr}
          />

          <div className="flex flex-col gap-5">
            {/* title */}
            <Search register={register} />
            {/* Runtime */}
            <Runtime register={register} />
            {/* Sort By */}
            <Sort register={register} />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <SubmitBtn setOpen={setOpen} />
            <CloseBtn setOpen={setOpen} />
            {/* <ClearBtn reset={reset} /> */}
          </div>

          {/* page */}
          <input type="hidden" value={page} {...register("page")} />
        </form>
      </div>
    </div>
  );
};

export default DesktopFilter;
