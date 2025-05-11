import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import useDB from "../hook/useDB";
import Post from "../types/Post";
import { deleteContent } from "./contentService";
const db = useDB();
export const getAllPost = async () => {
  try {
    const result = await getDocs(collection(db, "post"));
    const posts = result.docs.map((post): Post => {
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
      };
    });
    return posts;
  } catch (e) {
    console.log('get all post error: ' + e);
  }
};

export const getPost = async (id: string) : Promise<Post | undefined> => {
  try {
    const post = await getDoc(doc(db, "post", id));
    if (!post) return undefined;
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
      };
  } catch (e) {
    console.log("get post error: " + e);
  }
};

export const deletePost = async (post : Post)  => {
    try{
        await deleteDoc(doc(db, 'post', post.id as string));
        if (await deleteContent(post.contentId)) return true;
        else return false;
    } catch (e) {
        console.log('delete error: ' + e);
        return false;
    }
}
