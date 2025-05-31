import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/store/hook";
import UserPhoto from "@/assets/user.svg";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Edit } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
const Account = () => {
  const { user } = useAppSelector((s) => s.authReducer);
  const menuItem = [
    {
      id: 0,
      name: "Bài viết",
      link: "",
      onClick: () => {},
    },
    {
      id: 0,
      name: "Series",
      link: "a",
      onClick: () => {},
    },
    {
      id: 0,
      name: "Bookmark",
      link: "b",
      onClick: () => {},
    },
    {
      id: 0,
      name: "Đang theo dõi",
      link: "c",
      onClick: () => {},
    },
    {
      id: 0,
      link: "d",
      name: "Người theo dõi",
      onClick: () => {},
    },
    {
      id: 0,
      link: "d",
      name: "Thông tin tài khoản",
      onClick: () => {},
    },
  ];

  return (
    <div className=" my-5">
      <div className="max-w-[1120px]  mx-auto flex items-center gap-4">
        <div className="border rounded-full p-2">
          <Avatar className="size-18">
            <AvatarImage src={user?.photoURL || UserPhoto}></AvatarImage>
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="flex items-center gap-4">
            <h2>{user?.name || "No name"}</h2>
            <Edit size={14} />
          </div>
          <h3 className="text-gray-500">{user?.email}</h3>
        </div>
      </div>

      <hr className="mt-5" />

      <div className=" flex items-center gap-10 text-gray-600 shadow-sm lg:px-50 overflow-auto">
        {menuItem.map((item) => (
          <>
            <NavLink
              to={item.link}
              className="p-2 hover:text-blue-500 transition-colors cursor-pointer text-nowrap"
              onClick={item.onClick}
            >
              {item.name}
            </NavLink>
          </>
        ))}
      </div>

      <div className="mx-auto max-w-[1120px] my-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Account;
