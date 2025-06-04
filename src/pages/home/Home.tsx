import SideBar from "@/components/sideBar/SideBar";
import BlogPostList from "../../components/blogPostList/BlogPostList";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* <HeroSection /> */}
      <main className="container flex gap-10 px-10 my-20 max-w-[1220px]">
        <div className="flex-8/12">
          <BlogPostList />
        </div>
        <div className="flex-4/12 hidden lg:block ">
          <SideBar />
        </div>
      </main>
    </div>
  );
}
