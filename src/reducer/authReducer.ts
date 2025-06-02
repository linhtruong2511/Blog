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
    loginSuccess: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
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

    updateAuthUser: (state, action : PayloadAction<object>) => {
      const newUser = {
        ...state.user,
        ...action.payload,
      }
      
      state.user = newUser as UserType;
    }
  },
});

export default authSlice.reducer;
export const { loginSuccess, logout, loadingFinish, updateAuthUser } = authSlice.actions;
