import About from "../about/About";
import Search from "../search/Search";
import Trending from "../trending/Trending";

export default function SideBar() {
  return (
    <div className="flex flex-col gap-16 h-full rounded-xl p-5">
      <Search />
      <About />
      <Trending />
    </div>
  );
}
