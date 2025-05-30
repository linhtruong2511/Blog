import Logo from "./Logo";
import SearchDiaglog from "../search/SearchDialog";
import AvatarButton from "./AvatarButton";

export default function Navbar() {
  return (
    <>
      <div className="shadow-md">
        <header className="flex items-center justify-between py-4 max-w-[1120px] mx-auto">
          <Logo />
          <div className="flex items-center gap-5">
            <SearchDiaglog />
            <AvatarButton />
          </div>
        </header>
      </div>
    </>
  );
}
