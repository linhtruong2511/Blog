import BlogPostCart from "../../components/blogPostCart/BlogPostCart";
import HeroSection from "../../components/heroSection/HeroSection";
import SideBar from "../../components/sideBar/SideBar";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* <HeroSection /> */}
      <main className="container flex gap-10 px-10 my-20 max-w-[1220px]">
        <div className="flex-8/12">
          <BlogPostCart />
        </div>
        <div className="flex-4/12">
          <SideBar />
        </div>
      </main>
    </div>
  );
}
