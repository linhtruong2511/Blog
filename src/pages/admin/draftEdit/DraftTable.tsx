import { Checkbox } from "@/components/ui/checkbox";
import { getAllDraft } from "@/service/postService";
import { useEffect, useState } from "react";
import Post from "@/types/Post";
import DraftTableRow from "./DraftTableRow";

export default function DraftTable() {
  const [drafts, setDrafts] = useState<Post[]>([]);

  useEffect(() => {
    const fetdata = async () => {
      const data = await getAllDraft();
      setDrafts(data);
    };
    fetdata();
  }, []); 

  return (
    <div className="relative overflow-x-auto">
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
              Lần cuối cập nhật
            </th>
            <th scope="col" className="px-6 py-3">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {drafts.map((draft) => {
            return (
              <DraftTableRow key={draft.id} draft={draft}/>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
