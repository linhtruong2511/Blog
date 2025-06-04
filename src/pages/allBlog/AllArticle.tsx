import ListPost from "../../components/blogPostList/ListPost";
import SideBar from "../../components/sideBar/SideBar";

export default function AllArticle() {
  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <main className="container flex gap-10 px-10 pb-20">
          <div className="flex-8/12">
            <ListPost />
          </div>
          <div className="flex-4/12">
            <SideBar />
          </div>
        </main>
      </div>
    </>
  );
}
