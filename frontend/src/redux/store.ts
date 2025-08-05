/** @format */

import { configureStore } from "@reduxjs/toolkit";
import movieFilterSlice from "./movieFilterSlide";
import authSide from "./authSlide";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    movieFilter: movieFilterSlice,
    auth: authSide,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

// Typed dispatch for safety
export const useAppDispatch: () => AppDispatch = useDispatch;
