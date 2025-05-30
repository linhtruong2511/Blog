import { AuthState } from "@/types/AuthState";
import { UserType } from "@/types/UserType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

const authSlice = createSlice({
  initialState: initialState,
  name: "auth",
  reducers: {
    loginSuccess: (state, payload: PayloadAction<UserType>) => {
      state.user = payload.payload;
      state.isAuthenticated = true;
    },
    loadingFinish: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
  },
});

export default authSlice.reducer;
export const { loginSuccess, logout, loadingFinish } = authSlice.actions;
