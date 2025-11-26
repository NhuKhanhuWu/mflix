/** @format */
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
  isLogin: false,
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
    logOutSuccess() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.isLogin = true;
      state.avartar = action.payload.avatar;
      state.id = action.payload._id;
    });
  },
});

export const { loginSuccess, logOutSuccess } = authSide.actions;
export default authSide.reducer;
