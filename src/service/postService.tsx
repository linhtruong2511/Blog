import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import useDB from "../hook/useDB";
import Post from "../types/Post";
import { deleteContent } from "./contentService";
import { convertPostSnap } from "../utils/convert";

const db = useDB();

export const getAllPost = async () => {
  try {
    const result = await getDocs(collection(db, "post"));
    const posts = result.docs.map((post): Post => {
      return convertPostSnap(post);
    });
    return posts;
  } catch (e) {
    console.log("get all post error: " + e);
  }
};

export const getAllPostNotDraft = async () => {
  try {
    // const q = query()
    const result = await getDocs(collection(db, "post"));
    const posts = result.docs.map((post): Post => {
      return convertPostSnap(post);
    });
    return posts;
  } catch (e) {
    console.log("get all post error: " + e);
  }
};

export const getPost = async (id: string): Promise<Post | undefined> => {
  try {
    const post = await getDoc(doc(db, "post", id));
    if (!post) return undefined;
    return convertPostSnap(post);
  } catch (e) {
    console.log("get post error: " + e);
  }
};

export const deletePost = async (post: Post) => {
  try {
    await deleteDoc(doc(db, "post", post.id as string));
    if (await deleteContent(post.contentId)) return true;
    else return false;
  } catch (e) {
    console.log("delete error: " + e);
    return false;
  }
};

export const addPost = async (post: Post): Promise<string | undefined> => {
  try { 
    const postRef = await addDoc(collection(db, "post"), post);
    return postRef.id as string;
  } catch (e) {
    console.log("error in add post");
  }
};

export const updatePost = async (id: string, data : object) : Promise<boolean> => {
  try{
    await updateDoc(doc(db, "post", id), data);
    return true;
  } catch(e) {
    console.log(e);
    return false;
  }
}