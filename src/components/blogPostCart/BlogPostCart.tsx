import { useEffect, useState } from "react";
import Cart from "./Cart";
import Post from "../../types/Post";
import useDB from "../../hook/useDB";
import { collection, getDocs } from "firebase/firestore";

export default function BlogPostCart() {
  const db = useDB();
  const [carts, setCarts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPost = async () => {
      const postSnap = await getDocs(collection(db, "post"));
      const posts = postSnap.docs.map((post): Post => {
        return {
          id: post.id,
          contentId: post.get("content"),
          createDate: post.get("createDate"),
          shortDesc: post.get("shortDesc"),
          status: post.get("status"),
          tags: post.get("tags"),
          thumbnailURL: post.get("thumbnailURL"),
          title: post.get("title"),
          view: post.get("view"),
        };
      });
      setCarts(posts);
    };
    fetchPost();
  }, []);
  return (
    <>
      <div className="h-full">
        <div className="">
          {carts.map((cart) => {
            return <Cart key={cart.id} cart={cart} />;
          })}
        </div>
      </div>
    </>
  );
}
