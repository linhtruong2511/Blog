import { Link } from "react-router-dom";
import { TbSquareToggle } from "react-icons/tb";

export default function NavBar() {
  return (
    <div className="bg-gray-200 text-black text-xl top-0 sticky w-60 h-screen">
      <div className="py-5 flex flex-col justify-between h-full">
        <ul className="w-full ">
          <div className="flex justify-between mb-12 items-center px-2">
            <h2 className="text-3xl font-bold ">Admin</h2>
            <TbSquareToggle className="text-2xl cursor-pointer" />
          </div>
          <Link to={"/admin"}>
            <li className="hover:bg-gray-400 hover:text-white transition-all py-3 px-2">
              Quản lý bài viết
            </li>
          </Link>
          <Link to={"/admin/createblog"}>
            <li className="hover:bg-gray-400 hover:text-white transition-all py-3 px-2">
              Tạo bài viết
            </li>
          </Link>
          <Link to={"/admin"}>
            <li className="hover:bg-gray-400 hover:text-white transition-all py-3 px-2">
              Tài khoản
            </li>
          </Link>
          <Link to={"/admin"}>
            <li className="hover:bg-gray-400 hover:text-white transition-all py-3 px-2">
              Cài đặt
            </li>
          </Link>
        </ul>
        <ul>
          <Link to={"/"}>
            <li className="hover:bg-gray-400 hover:text-white transition-all py-3 px-2">
              Thoát
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
