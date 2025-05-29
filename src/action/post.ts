import { Action } from "@/types/Action";
import PostType from "@/types/PostType";

export const getPost = (posts : PostType[]) : Action => {
  return {
    type: "GET",
    payload: posts
  };
};


