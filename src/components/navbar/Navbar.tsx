import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Logo from "./Logo";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="shadow-md">
      <header className="flex items-center justify-between py-4 max-w-[1120px] mx-auto">
        <Logo />
        <Input placeholder="Tìm kiếm" className="w-4/12 hidden lg:block"/>
        {/* <div className="basis-xl hidden md:flex items-center justify-between gap-4 "> */}
        <Button onClick={() => navigate('/login')} className="hidden md:block">Codedump console</Button>
        {/* </div> */}
      </header>
    </div>
  );
}
