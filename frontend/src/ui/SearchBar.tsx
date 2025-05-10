/** @format */

import { SubmitHandler, useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { FilterFormProps } from "../interfaces/movieFilterInterface";

export function SearchBar() {
  const { register, handleSubmit } = useForm<FilterFormProps>();

  const onSubmit: SubmitHandler<FilterFormProps> = (data) => {
    console.log("Search query:", data.title);
    // You can handle search logic here (e.g., call a function or update state)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative w-[20rem] focus-within:w-[25rem] transition-all duration-300">
        <input
          type="text"
          placeholder="Search movies..."
          {...register("title")}
          className="input pl-10"
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
      </div>
    </form>
  );
}
