import Logo from "./Logo";
import Nav from "./Nav";

export default function Navbar() {
  return (
    <>
      <header className="flex items-center justify-between shadow-xl px-7 py-4">
        <Logo />
        <Nav />
      </header>
    </>
  );
}
