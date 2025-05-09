import BlogPostCart from "../../components/blogPostCart/BlogPostCart";
import SideBar from "../../components/sideBar/SideBar";

export default function AllBlog() {
  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <main className="container flex gap-10 px-10 pb-20">
          <div className="flex-8/12">
            <BlogPostCart />
          </div>
          <div className="flex-4/12">
            <SideBar />
          </div>
        </main>
      </div>
    </>
  );
}
