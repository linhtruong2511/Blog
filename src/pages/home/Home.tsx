import BlogPostList from "../../components/blogPostList/BlogPostCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* <HeroSection /> */}
      <main className="container flex gap-10 px-10 my-20 max-w-[1220px]">
        <div className="flex-8/12">
          <BlogPostList />
        </div>
      </main>
    </div>
  );
}
