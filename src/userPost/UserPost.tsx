import React from "react";

const UserPost = () => {
  return (
    <div className="flex justify-between">
      <div className="flex-7/12">a</div>
      <div className="grow px-2 py-4 border-2 border-gray-500">
        <div className="flex items-center justify-between">
          <p>Tổng số lượt xem bài viết</p>
          <p>0</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Đang theo dõi các người dùng</p>
          <p>0</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Số lượng người theo dõi</p>
          <p>0</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Bài viết</p>
          <p>0</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Bookmark</p>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
