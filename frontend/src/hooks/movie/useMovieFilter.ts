/** @format */

// hooks/useMovieFilters.ts
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FilterFormProps } from "../../interfaces/movieFilterInterface";
import { useDispatch } from "react-redux";
import { changePage, setQueryString } from "../../redux/movieFilterSlide";
import { BaseSyntheticEvent } from "react";

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

  // runtime
  const rawRuntime = [
    getParam("runtime[lt]") && `runtime[lt]=${getParam("runtime[lt]")}`,
    getParam("runtime[gte]") && `runtime[gte]=${getParam("runtime[gte]")}`,
    getParam("runtime[lte]") && `runtime[lte]=${getParam("runtime[lte]")}`,
    getParam("runtime[gt]") && `runtime[gt]=${getParam("runtime[gt]")}`,
  ]
    .filter(Boolean) // remove falsy like undefined/false
    .join("&");

  const runtime = VALID_RUNTIMES.includes(
    rawRuntime as (typeof VALID_RUNTIMES)[number]
  )
    ? (rawRuntime as (typeof VALID_RUNTIMES)[number])
    : "";

  // sort
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
  const navigate = useNavigate();

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
    const decodedQuery = decodeURIComponent(newParams.toString());
    dispatch(setQueryString(decodedQuery));
    dispatch(changePage(formData.page));

    // Redirect to /movies if not already there
    if (location.pathname !== "/movies") {
      navigate("/movies");
    }
  };

  return {
    form,
    applyFilters,
    currentParams: searchParams.toString(),
    queryString: decodeURIComponent(searchParams.toString()),
  };
}
