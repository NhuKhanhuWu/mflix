/** @format */

import { UseFormReset } from "react-hook-form";
import { GenreProps } from "../../interfaces/genreInterface";
import { GenreListProps } from "../../interfaces/genreInterface";
import Spinner from "../../ui/Spinner";
import {
  FilterFormProps,
  InputRegisterProps,
} from "../../interfaces/movieFilterInterface";
import { Dispatch, SetStateAction } from "react";

export function Label({ label }: { label: string }) {
  return <label className="block mb-1 text-xl font-semibold">{label}</label>;
}

export const Search: React.FC<InputRegisterProps> = ({ register }) => {
  return (
    <div>
      <Label label="Title" />
      <input
        {...register("title")}
        className="input"
        name="title"
        placeholder="Movie's title"></input>
    </div>
  );
};

export const Genre: React.FC<GenreProps & InputRegisterProps> = ({
  genre,
  register,
}) => {
  return (
    <label key={genre._id} className="inline-flex items-center text-xl">
      <input
        type="checkbox"
        value={genre._id}
        className="form-checkbox text-red-600"
        {...register("genres")}
      />
      <span className="ml-2">{genre._id}</span>
    </label>
  );
};

export const Genres: React.FC<GenreListProps & InputRegisterProps> = ({
  genres,
  isLoading,
  register,
}) => {
  if (isLoading) return <Spinner />;

  return (
    <div className="mb-4">
      <Label label="Genres" />
      <div className="grid grid-cols-5 gap-y-2 overflow-y-auto pr-2">
        {genres?.map((genre) => (
          <Genre genre={genre} register={register} key={genre._id} />
        ))}
      </div>

      <div className="mt-2 text-sm">
        <Label label="Match" />
        <label className="mr-4 inline-flex items-center">
          <input
            {...register("match")}
            type="radio"
            value="any"
            className="form-radio text-red-600"
          />
          <span className="ml-1 text-xl">Any</span>
        </label>
        <label className="inline-flex items-center">
          <input
            {...register("match")}
            type="radio"
            value="all"
            className="form-radio text-red-600"
          />
          <span className="ml-1 text-xl">All</span>
        </label>
      </div>
    </div>
  );
};

export const Runtime: React.FC<InputRegisterProps> = ({ register }) => {
  return (
    <div className="mb-4">
      <Label label="Runtime" />
      <select className="input" {...register("runtime")}>
        <option value="">All</option>
        <option value="runtime[lt]=90">&lt; 90 minutes</option>
        <option value="runtime[gte]=90&runtime[lte]=120">
          90 – 120 minutes
        </option>
        <option value="runtime[gt]=120">&gt; 120 minutes</option>
      </select>
    </div>
  );
};

export const Sort: React.FC<InputRegisterProps> = ({ register }) => {
  return (
    <div className="mb-4">
      <Label label="Sort By" />
      <select className="input" {...register("sort")}>
        <option value="-year">Latests</option>
        <option value="-imdbScore">Hightest score</option>
        <option value="-title">A-Z</option>
        <option value="title">Z-A</option>
      </select>
    </div>
  );
};

export const SubmitBtn: React.FC<{
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  return (
    <button
      className="primary-btn btn"
      type="submit"
      onClick={() => setOpen(false)}>
      Apply
    </button>
  );
};

export const CloseBtn: React.FC<{
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  return (
    <button
      className="secondary-btn btn"
      onClick={() => {
        setOpen(false);
      }}
      type="button">
      Close
    </button>
  );
};

export const ClearBtn: React.FC<{ reset: UseFormReset<FilterFormProps> }> = ({
  reset,
}) => {
  return (
    <button
      className=" secondary-btn btn"
      onClick={() => reset()}
      type="button">
      X Clear filter
    </button>
  );
};
