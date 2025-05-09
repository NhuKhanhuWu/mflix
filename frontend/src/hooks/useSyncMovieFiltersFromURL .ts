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

      // update movieFilter query string
      searchParams.delete("page");
      const queryString = decodeURIComponent(searchParams.toString());
      dispatch(setQueryString(queryString));
    },
    [dispatch, searchParams]
  );
}

export default useSyncMovieFiltersFromURL;
