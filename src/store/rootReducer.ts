import { combineReducers } from "@reduxjs/toolkit";
import postReducer from "@/reducer/postReducer";
import authReducer from "@/reducer/authReducer";

export const rootReducer = combineReducers({
  postReducer,
  authReducer,
});
