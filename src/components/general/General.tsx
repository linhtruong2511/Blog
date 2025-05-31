import React from "react";

const General = () => {
  return (
    <div className="grow px-2 py-4 border-2 border-gray-300 text-gray-400 rounded-md">
      <div className="flex items-center justify-between hover:text-blue-500 cursor-pointer">
        <p>Tổng số lượt xem bài viết</p>
        <p>0</p>
      </div>
      <div className="flex items-center justify-between hover:text-blue-500 cursor-pointer">
        <p>Đang theo dõi các người dùng</p>
        <p>0</p>
      </div>
      <div className="flex items-center justify-between hover:text-blue-500 cursor-pointer">
        <p>Số lượng người theo dõi</p>
        <p>0</p>
      </div>
      <div className="flex items-center justify-between hover:text-blue-500 cursor-pointer">
        <p>Bài viết</p>
        <p>0</p>
      </div>
      <div className="flex items-center justify-between hover:text-blue-500 cursor-pointer">
        <p>Bookmark</p>
        <p>0</p>
      </div>
    </div>
  );
};

export default General;
