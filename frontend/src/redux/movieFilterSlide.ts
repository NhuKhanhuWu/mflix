/** @format */

// store/movieFilterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieSimplify } from "../interfaces/movieInterfaces";

interface MovieFilterState {
  queryString: string;
  movies: MovieSimplify[];
  page: number;
}

const initialState: MovieFilterState = {
  queryString: "",
  movies: [],
  page: 1,
};

export const movieFilterSlice = createSlice({
  name: "movieFilter",
  initialState,
  reducers: {
    setQueryString(state, action: PayloadAction<string>) {
      state.queryString = action.payload;
    },
    setMovies(state, action: PayloadAction<MovieSimplify[]>) {
      state.movies = action.payload;
    },
    resetMovieFilter(state) {
      state.queryString = "";
      state.movies = [];
    },
    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload;

      // update page in url
      const params = new URLSearchParams(window.location.search);
      params.set("page", action.payload.toString());
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params}`
      );
    },
  },
});

export const { setQueryString, setMovies, resetMovieFilter, changePage } =
  movieFilterSlice.actions;
export default movieFilterSlice.reducer;
