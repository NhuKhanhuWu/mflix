/** @format */

import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";

export function SearchBar() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Search query:", data.search);
    // You can handle search logic here (e.g., call a function or update state)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative w-[20rem] focus-within:w-[25rem] transition-all duration-300">
        <input
          type="text"
          placeholder="Search movies..."
          {...register("search")}
          className="input pl-10"
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
      </div>
    </form>
  );
}
