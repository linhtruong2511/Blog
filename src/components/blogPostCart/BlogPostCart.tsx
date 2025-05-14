import { useEffect, useState } from "react";
import Cart from "./Cart";
import Post from "../../types/Post";
import useDB from "../../hook/useDB";
import { getAllPost } from "../../service/postService";

export default function BlogPostCart() {
  const [carts, setCarts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPost = async () => {
      const posts = await getAllPost();
      if (!posts) return;
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
