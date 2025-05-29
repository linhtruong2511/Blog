import useDB from "@/hooks/useDB";
import { UserType } from "@/types/UserType";
import { convertUserSnap } from "@/utils/convert";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
const db = useDB();

export const createUser = async (user: UserType) => {
  try {
    await addDoc(collection(db, "user"), {
      user,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (
  userId: string
): Promise<UserType | undefined> => {
  try {
    const userSnap = await getDoc(doc(db, "user", userId));
    return convertUserSnap(userSnap);
  } catch (e) {
    console.log(e);
  }
};

export const updateUser = async (newProfile: object): Promise<boolean> => {
  try {
    await updateDoc(doc(db, "user"), {
      ...newProfile
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
