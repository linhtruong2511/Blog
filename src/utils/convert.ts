import { DocumentSnapshot } from "firebase/firestore";
import PostType from "../types/PostType";

export const convertPostSnap = (post: DocumentSnapshot): PostType => {
  return {
    title: post.get("title"),
    contentId: post.get("contentId"),
    createDate: post.get("createDate"),
    id: post.id,
    shortDesc: post.get("shortDesc"),
    status: post.get("status"),
    tags: post.get("tags"),
    thumbnailURL: post.get("thumbnailURL"),
    view: post.get("view"),
    lastUpdate: post.get("lastUpdate"),
    isDraft: post.get("isDraft"),
  };
};
