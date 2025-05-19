import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <>
      <Link to={"/"} className="flex items-center font-bold">
        {/* <img src={logo} alt="" className="h-16 w-16" /> */}
        <h1 className="text-3xl">DevTruong</h1>
      </Link>
    </>
  );
}
