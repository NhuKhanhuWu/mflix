/** @format */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { changePage, setQueryString } from "../redux/movieFilterSlide";

function useSyncMovieFiltersFromURL() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(
    function () {
      // update movieFilter page
      const pageParam = Number(searchParams.get("page"));
      const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
      dispatch(changePage(page));

      // Clone searchParams to modify
      const params = new URLSearchParams(searchParams.toString());

      // Ensure default values if not present
      if (!params.has("match")) {
        params.set("match", "any");
      }

      if (!params.has("sort")) {
        params.set("sort", "-year");
      }

      // Remove page param for query string
      params.delete("page");

      // Update movieFilter query string
      const queryString = decodeURIComponent(params.toString());
      dispatch(setQueryString(queryString));
    },
    [dispatch, searchParams]
  );
}

export default useSyncMovieFiltersFromURL;
