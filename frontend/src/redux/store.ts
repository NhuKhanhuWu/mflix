/** @format */

import { configureStore } from "@reduxjs/toolkit";
import movieFilterSlice from "./movieFilterSlide";
import authSide from "./authSlide";

export const store = configureStore({
  reducer: {
    movieFilter: movieFilterSlice,
    auth: authSide,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
