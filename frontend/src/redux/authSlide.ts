/** @format */
import Cookies from "js-cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyInfor } from "../api/user/getMyInfor";

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async () => {
    const userData = await getMyInfor();
    return userData; // assume it includes `avatar`
  }
);

interface authSildeInterface {
  isLogin: boolean;
  avartar: string;
  id: string;
}

const initialState: authSildeInterface = {
  isLogin: Cookies.get("loginToken") !== undefined,
  avartar: "",
  id: "",
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
      state.avartar = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.avartar = action.payload.avatar;
      state.id = action.payload._id;
    });
  },
});

export const { loginSuccess, logOutSuccess } = authSide.actions;
export default authSide.reducer;
