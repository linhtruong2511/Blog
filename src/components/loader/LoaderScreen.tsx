import { Loader2 } from "lucide-react";

export default function LoaderScreen() {
  return (
    <div className="flex h-screen w-full items-center flex-col justify-center z-10 absolute">
      <Loader2 className="animate-spin" size={80} />
    </div>
  );
}
