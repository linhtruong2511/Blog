import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <Link to={"/"} className="flex items-center font-bold">
        <img src='./logox.png' alt="Logo" className="w-16" />
        <h1 className="text-3xl">DevTruong</h1>
      </Link>
    </>
  );
}
