import Card from "./Card";
import { useAppSelector } from "@/store/hook";

export default function BlogPostList() {
  const posts = useAppSelector((state) => state.postReducer); 
  return (
    <>
      <div className="h-full">
        <div className="">
          {posts.map((post) => {
            return <Card key={post.id} post={post} />;
          })}
        </div>
      </div>
    </>
  );
}
