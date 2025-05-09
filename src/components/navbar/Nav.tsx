import { Link } from "react-router-dom";
import { FaShareAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import SearchDiaglog from "../search/SearchDialog";
import { useState } from "react";

export default function Nav() {
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const handleShowDialog = () => {
    setIsShowDialog((s) => !s);
  };
  const navList = (
    <>
      <Link to={"/"}>
        <li>Home</li>
      </Link>
      <Link to={"/blogs"}>
        <li>Blogs</li>
      </Link>
      <Link to={"/admin"}>
        <li>About</li>
      </Link>
    </>
  );

  return (
    <ul className="relative flex items-center gap-5">
      {navList}
      <FaSearch
        size={20}
        onClick={handleShowDialog}
        className="cursor-pointer"
      />
      <FaShareAlt size={20} />
      <div
        className="absolute top-10 right-10 z-10 transition-all"
        style={{
          visibility: isShowDialog ? "visible" : "hidden",
          opacity: isShowDialog ? "1" : "0",
        }}
      >
        <SearchDiaglog />
      </div>
    </ul>
  );
}
