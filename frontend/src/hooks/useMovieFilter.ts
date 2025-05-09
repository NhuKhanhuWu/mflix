/** @format */

// hooks/useMovieFilters.ts
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FilterFormProps } from "../interfaces/movieFilterInterface";
import { useDispatch } from "react-redux";
import { changePage, setQueryString } from "../redux/movieFilterSlide";
import { BaseSyntheticEvent } from "react";

// function parseQueryParams(params: URLSearchParams): FilterFormProps {
//   const validRuntimes = [
//     "",
//     "runtime[lt]=90",
//     "runtime[gte]=90&runtime[lte]=120",
//     "runtime[gt]=120",
//   ];
//   const validSorts = ["-year", "-title", "title"];

//   const runtimeParam = params.get("runtime") || "";
//   const sortParam = params.get("sort") || "";

//   const runtime = validRuntimes.includes(runtimeParam) ? runtimeParam : "";
//   const sort = validSorts.includes(sortParam) ? sortParam : "-year";

//   return {
//     genres: params.get("genres")?.split(",") || [],
//     match: (params.get("match") as "any" | "all") || "any",
//     imdbScore: params.get("imdbScore") || "",
//     runtime,
//     sort,
//     title: params.get("title") || "",
//   };
// }

function parseQueryParams(params: URLSearchParams): FilterFormProps {
  const VALID_RUNTIMES = [
    "",
    "runtime[lt]=90",
    "runtime[gte]=90&runtime[lte]=120",
    "runtime[gt]=120",
  ] as const;

  const VALID_SORTS = ["-year", "-title", "title"] as const;
  const VALID_MATCHES = ["any", "all"] as const;

  const getParam = (key: string) => params.get(key) || "";

  const genres = getParam("genres").split(",").filter(Boolean);
  const match = VALID_MATCHES.includes(getParam("match") as any)
    ? (getParam("match") as "any" | "all")
    : "any";
  const imdbScore = getParam("imdbScore");
  const title = getParam("title");

  const runtime = VALID_RUNTIMES.includes(getParam("runtime") as any)
    ? (getParam("runtime") as (typeof VALID_RUNTIMES)[number])
    : "";

  const sort = VALID_SORTS.includes(getParam("sort") as any)
    ? (getParam("sort") as (typeof VALID_SORTS)[number])
    : "-year";

  return {
    genres,
    match,
    imdbScore,
    runtime,
    sort,
    title,
    page: 0,
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
  params.set("match", form.match || "any");

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

  const applyFilters = (formData: FilterFormProps, e: BaseSyntheticEvent) => {
    e.preventDefault();
    formData.page = 1; // 🔁 reset page when apply new filter

    // update in url
    const newParams = buildQueryParams(formData);
    setSearchParams(newParams);

    // update in movieFilter redux
    const decodedQuery = "?" + decodeURIComponent(newParams.toString());
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
