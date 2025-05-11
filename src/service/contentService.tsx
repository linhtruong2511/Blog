import { doc, getDoc } from "firebase/firestore";
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
    console.log('get content id: ' + id + 'with error ' + e);
  }
};
