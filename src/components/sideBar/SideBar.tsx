import Authors from "./Authors";
import Search from "./Search";
import Trending from "./Trending";

export default function SideBar() {
  return (
    <div className="flex flex-col gap-8 h-full rounded-xl p-5">
      <Search />
      <Trending />
      <Authors />
    </div>
  );
}
