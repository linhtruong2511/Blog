import { AuthState } from "@/types/AuthState";
import PostType from "@/types/PostType";
import { UserType } from "@/types/UserType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  posts: [],
};

type PostUserUpdate = {
  id: string;
  newData: object;
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

    updateAuthUser: (state, action: PayloadAction<object>) => {
      const newUser = {
        ...state.user,
        ...action.payload,
      };

      state.user = newUser as UserType;
    },

    setUserPosts: (state, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload;
    },
    updateUserPosts: (state, action: PayloadAction<PostUserUpdate>) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            ...action.payload.newData,
          };
        }
        return post;
      });
    },
    removeUserPosts: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export default authSlice.reducer;
export const {
  loginSuccess,
  logout,
  loadingFinish,
  updateAuthUser,
  setUserPosts,
  updateUserPosts,
  removeUserPosts,
} = authSlice.actions;
