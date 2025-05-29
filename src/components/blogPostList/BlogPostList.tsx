import { useEffect, useState } from "react";
import Card from "./Card";
import Post from "../../types/Post";
import { getAllPost } from "../../service/postService";

export default function BlogPostList() {
  const [cards, setCards] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPost = async () => {
      const posts = await getAllPost();
      if (!posts) return;
      setCards(posts);
    };
    fetchPost();
  }, []);
  return (
    <>
      <div className="h-full">
        <div className="">
          {cards.map((card) => {
            return <Card key={card.id} card={card} />;
          })}
        </div>
      </div>
    </>
  );
}
