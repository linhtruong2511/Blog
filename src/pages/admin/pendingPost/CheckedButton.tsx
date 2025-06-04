import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";

const CheckedButton = ({ onChecked }: { onChecked: () => void }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Plus size={16} onClick={onChecked} />
        </TooltipTrigger>
        <TooltipContent>Duyệt bài viết</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CheckedButton;
