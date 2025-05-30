import { loadingFinish, loginSuccess, logout } from "@/reducer/authReducer";
import { set } from "@/reducer/postReducer";
import { getAllPost } from "@/service/postService";
import { getUser } from "@/service/userService";
import { useAppDispatch } from "@/store/hook";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function InitApp() {
  const dispath = useAppDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubcribe = initUser();
    initPosts();
    return () => unsubcribe();
  }, [dispath]);

  const initPosts = async () => {
    const posts = await getAllPost();
    if (posts) dispath(set(posts));
  };

  const initUser = () => {
    const unsubcribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // lấy người dùng đã lưu trừ firestore
        const userStore = await getUser(user.uid);
        
        if (!userStore) {
          console.log("init user fail");
          return;
        }
        
        dispath(loginSuccess(userStore));

        // thể hiện trạng thái đang load user
        dispath(loadingFinish());
      } else {
        dispath(logout());
      }
    });
    return unsubcribe;
  };

  return <></>;
}
