/** @format */

import { FiSearch } from "react-icons/fi";
import { useMovieFilters } from "../hooks/useMovieFilter";
import { BaseSyntheticEvent } from "react";
import { FilterFormProps } from "../interfaces/movieFilterInterface";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const { form, applyFilters } = useMovieFilters();
  const { register, handleSubmit } = form;
  const navigate = useNavigate();

  function submit(data: FilterFormProps, e: BaseSyntheticEvent) {
    applyFilters(data, e as BaseSyntheticEvent<object, any, any>); // apply filter
    navigate(`/movies?title=${data.title?.split(" ").join("+")}`);
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="relative w-[20rem] focus-within:w-[25rem] transition-all duration-300">
        <input
          type="text"
          placeholder="Search movies..."
          {...register("title")}
          // name="title"
          className="input pl-10"
        />

        <button type="submit">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
        </button>
      </div>
    </form>
  );
}
