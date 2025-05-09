/** @format */

import { configureStore } from "@reduxjs/toolkit";
import movieFilterSlice from "./movieFilterSlide";

export const store = configureStore({
  reducer: {
    movieFilter: movieFilterSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
