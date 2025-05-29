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
import PostType from "../types/PostType";
import { deleteContent } from "./contentService";
import { convertPostSnap } from "../utils/convert";

const db = useDB();

export const getAllPost = async () => {
  try {
    const q = query(collection(db, "post"), where('isDraft', '==', false))
    const result = await getDocs(q);
    const posts = result.docs.map((post): PostType => {
      return convertPostSnap(post);
    });
    return posts;
  } catch (e) {
    console.log("get all post error: " + e);
  }
};


export const getAllDraft = async () : Promise<PostType[]> => {
  const q = query(collection(db, 'post'), where('isDraft', '==', true));
  const draftSnap = await getDocs(q);
  return (draftSnap).docs.map((draft) : PostType => {
    return convertPostSnap(draft);
  })
}

export const getPost = async (id: string): Promise<PostType | undefined> => {
  try {
    const post = await getDoc(doc(db, "post", id));
    if (!post) return undefined;
    return convertPostSnap(post);
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

export const updatePost = async (id: string, data : object) : Promise<boolean> => {
  try{
    await updateDoc(doc(db, "post", id), data);
    return true;
  } catch(e) {
    console.log(e);
    return false;
  }
}

export const searchPost = async (name: string) : Promise<PostType[] | undefined> => {
  try{
    const q = query(collection(db, 'post'), where('title', 'in', name))
    const snaps = await getDocs(q);
    return snaps.docs.map(snap => {
      return convertPostSnap(snap);
    })
  } catch(e) {
    console.log(e);
    return undefined;
  }
}