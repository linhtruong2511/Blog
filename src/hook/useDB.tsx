import { getFirestore } from "firebase/firestore";
import { app } from "../firebase/FirebaseConfig";
export default function useDB() {
  return getFirestore(app);
}
