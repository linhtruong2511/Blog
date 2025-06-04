import useDB from "@/hooks/useDB";
import { UserType } from "@/types/UserType";
import { convertUserSnap } from "@/utils/convert";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
const db = useDB();

export const createUser = async (user: UserType) => {
  try {
    await setDoc(doc(db, "user", user.uid), user);
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (
  userId: string
): Promise<UserType | undefined> => {
  try {
    const userSnap = await getDoc(doc(db, "user", userId));
    if (userSnap.exists()) {
      return convertUserSnap(userSnap);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getAllUser = async (): Promise<UserType[] | undefined> => {
  try {
    const usersSnap = await getDocs(collection(db, "user"));
    return usersSnap.docs.map((item) => {
      return convertUserSnap(item);
    });
  } catch (e : any) {
    console.log(e); 
  }
};

export const updateUser = async (
  newProfile: object,
  uid: string
): Promise<boolean> => {
  try {
    await updateDoc(doc(db, "user", uid), {
      ...newProfile,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
