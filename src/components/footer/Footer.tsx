import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="flex justify-center items-center gap-5 md:px-44 py-5 border-t border-gray-300">
        <h1 className="text-4xl font-bold hidden sm:block">
          <Link to={"/"}>CodeDump</Link>
        </h1>
        <p>© 2025 CodeDump. All rights reserved.</p>
      </div>
    </>
  );
}
