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
      <div className="flex justify-center items-center gap-5 px-44 py-5 border-t border-gray-300">
        <h1 className="text-4xl font-bold">
          <Link to={"/"}>DevTruong</Link>
        </h1>
        <p>© 2025 DevTruong. All rights reserved.</p>
      </div>
    </>
  );
}
