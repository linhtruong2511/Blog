import { useEffect, useState } from "react";
import Card from "./Card";
import Post from "../../types/Post";
import { getAllPost } from "../../service/postService";

export default function BlogPostList() {
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
            return <Card key={cart.id} cart={cart} />;
          })}
        </div>
      </div>
    </>
  );
}
