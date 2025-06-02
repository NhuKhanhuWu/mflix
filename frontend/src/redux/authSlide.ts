/** @format */

import { createSlice } from "@reduxjs/toolkit";

interface authSildeInterface {
  isLogin: boolean;
}

const initialState: authSildeInterface = {
  isLogin: false,
};

export const authSide = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state) {
      state.isLogin = true;
    },
    logOutSuccess(state) {
      state.isLogin = false;
    },
  },
});

export const { loginSuccess, logOutSuccess } = authSide.actions;
export default authSide.reducer;
