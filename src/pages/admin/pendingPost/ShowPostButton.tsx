import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PostType from "@/types/PostType";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShowPostButton = ({ post }: { post: PostType }) => {
  const navigate = useNavigate();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Eye
            className="cursor-pointer"
            onClick={() => navigate("/blog/" + post.id)}
            size={16}
          />
        </TooltipTrigger>
        <TooltipContent>Xem bài viết</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ShowPostButton;
