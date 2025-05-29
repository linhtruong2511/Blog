import { loadingFinish, loginSuccess, logout } from "@/reducer/authReducer";
import { set } from "@/reducer/postReducer";
import { getAllPost } from "@/service/postService";
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
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispath(loadingFinish())
        dispath(
          loginSuccess({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
          })
        );
      } else {
        dispath(logout());
      }
    });
    return unsubcribe;
  };

  return <></>;
}
