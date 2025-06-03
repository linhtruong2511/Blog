import { getPendingPost, updatePost } from "@/service/postService";
import PostType, { StatusPost } from "@/types/PostType";
import { useEffect, useState } from "react";

import PendingPostRow from "./PendingPostRow";
import { Checkbox } from "@/components/ui/checkbox";

const PendingPostTable = () => {
  const [pendingPost, setPendingPost] = useState<PostType[]>();

  const handleChecked = async (id: string) => {
    await updatePost(id, { status: StatusPost.show });

    setPendingPost(pendingPost?.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPendingPost();
      setPendingPost(data || []);
    };
    fetchData();
  }, []);
  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <Checkbox />
            </th>
            <th scope="col" className="px-6 py-3">
              Tiêu đề
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày tạo
            </th>
            <th scope="col" className="px-6 py-3">
              Tác giả
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {pendingPost &&
            pendingPost.map((pp) => {
              return <PendingPostRow pp={pp} onChecked={handleChecked} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

export default PendingPostTable;
