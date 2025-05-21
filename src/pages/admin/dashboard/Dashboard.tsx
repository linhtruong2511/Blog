import { Link } from "react-router-dom";
import BLogPostList from "./BlogPostList";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-between mb-10">
        <h2 className="text-3xl font-bold">Bài viết</h2>
        <Link to={"/admin/createblog"}>
          <Button>Thêm bài viết</Button>
        </Link>
      </div>
      <BLogPostList />
    </>
  );
}
