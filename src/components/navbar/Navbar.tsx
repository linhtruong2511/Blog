import Search from "../search/Search";
import Logo from "./Logo";
import Nav from "./Nav";

export default function Navbar() {
  return (
    <div className="shadow-md">
      <header className="flex items-center justify-between py-4 max-w-[1120px] mx-auto">
        <Logo />
        <div className="basis-2xs">
          <Search />
        </div>
      </header>
    </div>
  );
}
