/** @format */

import { FiSearch } from "react-icons/fi";
import { useMovieFilters } from "../hooks/useMovieFilter";
import { BaseSyntheticEvent } from "react";

export function SearchBar() {
  const { form, applyFilters } = useMovieFilters();
  const { register, handleSubmit } = form;

  return (
    <form
      onSubmit={handleSubmit((data, e) =>
        applyFilters(data, e as BaseSyntheticEvent<object, any, any>)
      )}>
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
