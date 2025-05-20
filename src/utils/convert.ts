import { DocumentSnapshot, QueryDocumentSnapshot } from "firebase/firestore";
import Post from "../types/Post";

export const convertPostSnap = (post: DocumentSnapshot): Post => {
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
