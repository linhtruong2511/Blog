import { NavLink } from "react-router-dom";

const menuItem = [
  {
    id: 0,
    name: "Bài viết",
    link: "",
    onClick: () => {},
  },
  {
    id: 1,
    name: "Series",
    link: "a",
    onClick: () => {},
  },
  {
    id: 2,
    name: "Bookmark",
    link: "b",
    onClick: () => {},
  },
  {
    id: 3,
    name: "Đang theo dõi",
    link: "c",
    onClick: () => {},
  },
  {
    id: 4,
    link: "d",
    name: "Người theo dõi",
    onClick: () => {},
  },
  {
    id: 5,
    link: "d",
    name: "Thông tin tài khoản",
    onClick: () => {},
  },
];

const MiniNavbar = () => {
  return (
    <div className=" flex items-center gap-10 text-gray-600 shadow-sm lg:px-50 overflow-auto">
      {menuItem.map((item) => (
        <NavLink
          to={item.link}
          className="p-2 hover:text-blue-500 transition-colors cursor-pointer text-nowrap"
          onClick={item.onClick}
          key={item.id}
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default MiniNavbar;
