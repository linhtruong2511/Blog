import { getFirestore } from "firebase/firestore";
import { app } from "../config/firebase/FirebaseConfig";
export default function useDB() {
  return getFirestore(app);
}
