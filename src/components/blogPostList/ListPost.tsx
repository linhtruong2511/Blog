import PostCard from "./PostCard";
import { useAppSelector } from "@/store/hook";

export default function ListPost() {
  const posts = useAppSelector((state) => state.postReducer); 
  return (
    <>
      <div className="h-full">
        <div className="">
          {posts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
        </div>
      </div>
    </>
  );
}
