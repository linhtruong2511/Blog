import Post from "@/types/Post";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Upload } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
interface Props {
  draft: Post;
}
export default function DraftTableRow({ draft }: Props) {
  const navigate = useNavigate();

  return (
    <>
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
                  onClick={() => navigate("/admin/editblog/" + draft.id)}
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
    </>
  );
}
