import { getAll } from "@/reducer/postReducer";
import { getAllPost } from "@/service/postService";
import { useAppDispatch } from "@/store/hook";
import { useEffect } from "react";

export default function InitApp() {
  const dispath = useAppDispatch();
  useEffect(() => {
    const init = async () => {
      const posts = await getAllPost();
      if (posts) dispath(getAll(posts));
    };
    init();
  }, [dispath]);

  return <></>;
}
