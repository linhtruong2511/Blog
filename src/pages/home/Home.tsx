import SideBar from "@/components/sideBar/SideBar";
import ListPost from "../../components/blogPostList/ListPost";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* <HeroSection /> */}
      <main className="container flex gap-10 px-10 my-20 max-w-[1220px]">
        <div className="flex-8/12">
          <ListPost />
        </div>
        <div className="flex-4/12 hidden lg:block ">
          <SideBar />
        </div>
      </main>
    </div>
  );
}
