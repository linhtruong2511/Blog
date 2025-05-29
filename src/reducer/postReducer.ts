import { RootState } from "@/store";
import PostType from "@/types/PostType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PostType[] = [];

type postUpdate = {
  id: string;
  newData: object;
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    set: (_ , action: PayloadAction<PostType[]>) => {
      return action.payload;
    },
    remove: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    add: (state, action: PayloadAction<PostType>) => {
      return [...state, action.payload];
    },
    update: (state, action: PayloadAction<postUpdate>) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload.newData,
          };
        }
        return item;
      });
    },
  },
});

export const PostStore = (state: RootState) => state.postReducer;
export const { set, add, update, remove } = postSlice.actions;
export default postSlice.reducer;
