import { getAllDraft } from "@/service/postService";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import Post from "@/types/Post";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Upload } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Draft() {
  const [drafts, setDrafts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetdata = async () => {
      const data = await getAllDraft();
      setDrafts(data);
    };
    fetdata();
  }, []);
  return (
    <>
      <header>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="border-r" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Bài viết gần đây</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <Link to={"/admin/createblog"}>
            <Button variant={"default"}>Thêm bài viết mới</Button>
          </Link>
        </div>
      </header>

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
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <td className="px-6 py-4">
                    <Checkbox />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {draft.title}
                  </th>
                  <td className="px-6 py-4">{draft.createDate}</td>
                  <td className="px-6 py-4">{draft.lastUpdate}</td>
                  <td className="flex gap-4 items-center px-5 py-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Edit
                            className="cursor-pointer"
                            onClick={() =>
                              navigate("/admin/editblog/" + draft.id)
                            }
                            size={16}
                          />
                        </TooltipTrigger>
                        <TooltipContent>Viết tiếp bài viết</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Upload size={16} />
                        </TooltipTrigger>
                        <TooltipContent>Đăng tải bài viết</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
