import {
  FaFacebook,
  FaTiktok,
  FaLinkedinIn,
  FaTelegram,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavLink } from "../../contexts/NavLinkProvider";

export default function Footer() {
  const navLink = useNavLink();
  const navList = (
    <>
      {navLink?.map((link) => {
        return (
          <Link key={link.url} to={link.url}>
            <li>{link.title}</li>
          </Link>
        );
      })}
    </>
  );
  return (
    <>
      <div className="flex justify-center  gap-32 px-44 py-5 border-t-2 border-gray-600">
        <div>
          <h1 className="text-4xl font-bold">
            <Link to={"/"}>DevTruong</Link>
          </h1>
          <p>
            © 2025 DevTruong. <br /> All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-red-400 font-bold mb-5">Folow Me</h1>
          <div className="flex items-center gap-5 text-xl">
            <FaFacebook className="cursor-pointer hover:text-red-300 transition-colors" />
            <FaTiktok className="cursor-pointer hover:text-red-300 transition-colors" />
            <FaLinkedinIn className="cursor-pointer hover:text-red-300 transition-colors" />
            <FaTelegram className="cursor-pointer hover:text-red-300 transition-colors" />
          </div>
        </div>
        <ul className="flex flex-col text-xl">{navList}</ul>
      </div>
    </>
  );
}
