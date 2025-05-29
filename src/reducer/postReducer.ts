import { RootState } from "@/store";
import PostType from "@/types/PostType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PostType[] = [];

export const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
    getAll: (state, action: PayloadAction<PostType[]>) => {
      return action.payload;
    }
  },
  extraReducers: (builder) => {

  }
})

export const PostStore = (state : RootState ) => state.postReducer;
export const { getAll } = postSlice.actions;
export default postSlice.reducer;