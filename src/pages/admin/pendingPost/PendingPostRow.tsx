import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { updatePost } from "@/service/postService";
import PostType, { StatusPost } from "@/types/PostType";
import { Diff, Divide, Eye, Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PendingPostRow = ({
  pp,
  onChecked,
}: {
  pp: PostType;
  onChecked: (id: string) => void;
}) => {
  const navigate = useNavigate();
  return (
    <tr
      key={pp.id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
    >
      <td className="px-6 py-4">
        <Checkbox />
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {pp.title}
      </th>
      <td className="px-6 py-4">{pp.createDate}</td>
      <td className="px-6 py-4">{pp.authorId}</td>
      <td className="px-6 py-4 text-red-500">{pp.status}</td>
      <td className="flex gap-4 items-center px-5 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Eye
                className="cursor-pointer"
                onClick={() => navigate("/blog/" + pp.id)}
                size={16}
              />
            </TooltipTrigger>
            <TooltipContent>Xem bài viết</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Plus size={16} onClick={() => onChecked(pp.id as string)} />
            </TooltipTrigger>
            <TooltipContent>Duyệt bài viết</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Minus   size={16} onClick={() => onChecked(pp.id as string)} />
            </TooltipTrigger>
            <TooltipContent>Từ chối</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
      </td>
    </tr>
  );
};

export default PendingPostRow;
