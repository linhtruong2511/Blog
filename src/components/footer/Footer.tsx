import { Link } from "react-router-dom";

export default function Footer() {
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
