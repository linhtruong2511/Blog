import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Draft() {
  const [drafts, setDrafts] = useState([
    {
      name: "React cơ bản",
      createAt: "20/5/2025",
    },
    {
      name: "Vue cơ bản",
      createAt: "20/5/2025",
    },
    {
      name: "Angular cơ bản",
      createAt: "20/5/2025",
    },
  ]);
  return (
    <>
      <div className="flex item-center justify-between">
        <h2 className="text-3xl font-bold ">Gần đây</h2>
        <Link to={'/admin/createblog'}>
          <button className="btn btn-primary">Thêm bài viết</button>
        </Link>
      </div>

      <div className="mt-10">
        <table className="w-full text-left ">
          <thead className="text-lg text-gray-700">
            <th className="border-b border-gray-200 py-1 px-2 w-8/12">Tên</th>
            <th className="border-b border-gray-200 py-1 px-2 w-4/12">
              Ngày sửa đổi
            </th>
            <th className="border-b border-gray-200 py-1 px-2 w-4/12"></th>
          </thead>
          <tbody>
            {drafts.map((draft) => {
              return (
                <>
                  <tr className="hover:bg-gray-100">
                    <td className="border-b border-gray-200 py-2 px-2 w-8/12">
                      {draft.name}
                    </td>
                    <td className="border-b border-gray-200 py-2 px-2 w-8/12">
                      {draft.createAt}
                    </td>
                    <td className="border-b border-gray-200 py-2 px-2 w-8/12">
                      <div className="flex gap-4 text-gray-600">
                        <FaEdit />
                        <FaTrash />
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
