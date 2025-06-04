import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Minus } from "lucide-react";

const RejectButton = ({ onReject }: { onReject: () => void }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Minus size={16} onClick={onReject} />
        </TooltipTrigger>
        <TooltipContent>Từ chối</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RejectButton;
