import { useAppSelector } from "@/store/hook";
import { NavLink, Outlet, useParams } from "react-router-dom";
import General from "@/components/general/General";
import { useEffect, useState } from "react";
import { getUser } from "@/service/userService";
import { UserType } from "@/types/UserType";
import PostType from "@/types/PostType";
import { getPostAuthor } from "@/service/postService";
import { useAccountContext } from "@/context/AccountContext";
import LoaderScreen from "@/components/loader/LoaderScreen";
import Photo from "./Photo";
import Name from "./Name";
import MiniNavbar from "./MiniNavbar";

const Account = () => {
  const { user } = useAppSelector((s) => s.authReducer);
  const [author, setAuthor] = useState<UserType>();
  const [posts, setPosts] = useState<PostType[]>([]);
  const { id } = useParams();
  const accContext = useAccountContext();
  const itMe = user?.uid === author?.uid;
  const isLoading = !posts || !author || !user;

  useEffect(() => {
    setTimeout(async () => {
      if (!id) {
        console.log("id author invalid:", id);
        return;
      }
      const author = await getUser(id);
      setAuthor(author);

      const posts = (await getPostAuthor(id)) || [];
      setPosts(posts);

      // đặt tác giả và post vào context
      accContext.setAuthor(author);
      accContext.setPosts(posts);
    }, 0);
  }, [id]);

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <div className=" my-5">
      <div className="max-w-[1120px]  mx-auto flex items-center gap-4">
        {user && <Photo itMe={itMe} author={author} user={user} />}
        <Name author={author} itMe={itMe} user={user} />
      </div>

      <hr className="mt-5" />

      <MiniNavbar />

      <div className="mx-auto max-w-[1120px] my-5 flex items-start justify-between">
        <div className="flex-7/12">
          <Outlet></Outlet>
        </div>

        {/* Bảng thông số chung */}
        <General posts={posts} />
      </div>
    </div>
  );
};

export default Account;
