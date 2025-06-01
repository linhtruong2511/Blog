import { DocumentSnapshot } from "firebase/firestore";
import PostType from "../types/PostType";
import { UserType } from "@/types/UserType";

export const convertPostSnap = (snap: DocumentSnapshot): PostType => {
  return {
    title: snap.get("title"),
    contentId: snap.get("contentId"),
    createDate: snap.get("createDate"),
    id: snap.id,
    shortDesc: snap.get("shortDesc"),
    status: snap.get("status"),
    tags: snap.get("tags"),
    thumbnailURL: snap.get("thumbnailURL"),
    view: snap.get("view"),
    lastUpdate: snap.get("lastUpdate"),
    isDraft: snap.get("isDraft"),
    authorId: snap.get("authorId"),
    vote: snap.get("vote"),
  };
};

export const convertUserSnap = (snap: DocumentSnapshot): UserType => {
  return {
    uid: snap.get('uid'),
    creationTime: snap.get('creationTime'),
    email: snap.get('email'),
    follower: snap.get('follower'),
    following: snap.get('following'),
    lastSignIn: snap.get('lastSignIn'),
    name: snap.get('name'),
    numberOfPost: snap.get('numberOfPost'),
    numberOfVote: snap.get('numberOfVote'),
    photoURL: snap.get('photoURL'),
    providerId: snap.get('providerId'),
    viewOfPost: snap.get('viewOfPost'),

    role: snap.get('role')
  };
};
