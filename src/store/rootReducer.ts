import { combineReducers } from "@reduxjs/toolkit"
import postReducer from '@/reducer/postReducer'

export const rootReducer = combineReducers({
  postReducer,
})