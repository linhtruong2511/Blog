import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import useDB from "../hooks/useDB";
import PostType, { StatusPost } from "../types/PostType";
import { deleteContent } from "./contentService";
import { convertPostSnap } from "../utils/convert";

const db = useDB();

export const getAllPost = async () => {
  try {
    const q = query(
      collection(db, "post"),
      where("isDraft", "==", false),
      where("status", "!=", StatusPost.pending)
    );
    const result = await getDocs(q);
    const posts = result.docs.map((post): PostType => {
      return convertPostSnap(post);
    });
    return posts;
  } catch (e) {
    console.log("get all post error: " + e);
  }
};

export const getPostAuthor = async (authorId: string) => {
  try {
    const q = query(collection(db, "post"), where("authorId", "==", authorId));
    const snaps = await getDocs(q);
    return snaps.docs.map((snap) => convertPostSnap(snap));
  } catch (e) {
    console.log(e);
  }
};

export const getAllDraft = async (): Promise<PostType[]> => {
  const q = query(collection(db, "post"), where("isDraft", "==", true));
  const draftSnap = await getDocs(q);
  return draftSnap.docs.map((draft): PostType => {
    return convertPostSnap(draft);
  });
};

export const getPendingPost = async (): Promise<PostType[]> => {
  const q = query(
    collection(db, "post"),
    where("status", "==", StatusPost.pending)
  );
  const draftSnap = await getDocs(q);
  return draftSnap.docs.map((draft): PostType => {
    return convertPostSnap(draft);
  });
};

export const getPost = async (id: string): Promise<PostType | undefined> => {
  try {
    const post = await getDoc(doc(db, "post", id));
    if (!post) return undefined;
    const currentPost = convertPostSnap(post);
    return currentPost;
  } catch (e) {
    console.log("get post error: " + e);
  }
};

export const deletePost = async (post: PostType) => {
  try {
    await deleteDoc(doc(db, "post", post.id as string));
    if (await deleteContent(post.contentId)) return true;
    else return false;
  } catch (e) {
    console.log("delete error: " + e);
    return false;
  }
};

export const addPost = async (post: PostType): Promise<string | undefined> => {
  try {
    const postRef = await addDoc(collection(db, "post"), post);
    return postRef.id as string;
  } catch (e) {
    console.log("error in add post");
  }
};

export const updatePost = async (
  id: string,
  data: object
): Promise<boolean> => {
  try {
    await updateDoc(doc(db, "post", id), data);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const searchPost = async (
  keyword: string
): Promise<PostType[] | undefined> => {
  try {
    const q = query(
      collection(db, "post"),
      where("isDraft", "==", false),
      where("title", ">=", keyword),
      where("title", "<=", keyword + "\uf8ff")
    );
    const snaps = await getDocs(q);
    console.log(keyword);
    return snaps.docs.map((snap) => {
      return convertPostSnap(snap);
    });
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
