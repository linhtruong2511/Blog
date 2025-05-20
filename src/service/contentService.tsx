import { addDoc, collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import useDB from "../hook/useDB";
import PostContent from "../types/PostContent";
const db = useDB();
export const getContent = async (id: string): Promise<PostContent | undefined> => {
  try {
    const result = await getDoc(doc(db, "content", id));
    return {
      data: result.get("data"),
      createDate: result.get("createDate"),
    };
  } catch (e) {
    return undefined;
  }
};

export const createContent = async (content : PostContent): Promise<string | undefined> => {
  try {
    const refContent = await addDoc(collection(db, "content"), content);
    return refContent.id as string;
  } catch (e) {
    console.log('create post content error: ' + e);
  }
};

export const deleteContent = async (id: string) => {
    try{
        await deleteDoc(doc(db, 'content', id));
        return true;
    } catch (e) {
        console.log('delete content error: ' + e);
        return false;
    }
}
