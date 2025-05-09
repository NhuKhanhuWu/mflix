/** @format */

// hooks/useMovieFilters.ts
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FilterFormProps } from "../interfaces/movieFilterInterface";
import { useDispatch } from "react-redux";
import { changePage, setQueryString } from "../redux/movieFilterSlide";
// import { useEffect } from "react";

function parseQueryParams(params: URLSearchParams): FilterFormProps {
  const validRuntimes = ["<90", "90-120", ">120", ""];
  const validSorts = ["-year", "-title", "title"];

  const runtimeParam = params.get("runtime") || "";
  const sortParam = params.get("sort") || "";

  const runtime = validRuntimes.includes(runtimeParam) ? runtimeParam : "<90";
  const sort = validSorts.includes(sortParam) ? sortParam : "-year";

  return {
    genres: params.get("genres")?.split(",") || [],
    match: (params.get("match") as "any" | "all") || "any",
    imdbScore: params.get("imdbScore") || "",
    runtime,
    sort,
    title: params.get("title") || "",
  };
}

function buildCompareParams<Key extends keyof FilterFormProps>(
  form: FilterFormProps,
  params: URLSearchParams,
  field: Key
) {
  const value = form[field];
  if (typeof value === "string") {
    new URLSearchParams(value).forEach((val, key) => {
      params.set(key, val);
    });
  }
}

function buildQueryParams(form: FilterFormProps): URLSearchParams {
  const params = new URLSearchParams();

  if (form.genres?.length) {
    params.set("genres", form.genres.join(","));
  }
  params.set("match", form.match);

  if (form.runtime) buildCompareParams(form, params, "runtime");
  if (form.sort) params.set("sort", form.sort);
  if (form.title) params.set("title", form.title);

  params.set("page", form.page?.toString() || "1"); // always set page in url

  return params;
}

export function useMovieFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const defaultValues = parseQueryParams(searchParams);

  const form = useForm<FilterFormProps>({
    defaultValues,
  });

  const applyFilters = (
    formData: FilterFormProps,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    formData.page = 1; // 🔁 reset page when apply new filter

    // update in url
    const newParams = buildQueryParams(formData);
    setSearchParams(newParams);

    // update in movieFilter redux
    const decodedQuery = decodeURIComponent(newParams.toString());
    dispatch(setQueryString(decodedQuery));
    dispatch(changePage(formData.page));
  };

  return {
    form,
    applyFilters,
    currentParams: searchParams.toString(),
    queryString: "?" + decodeURIComponent(searchParams.toString()),
  };
}
