import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  return (
    <div
      onClick={() => {
        window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
      }}
      className="fixed bottom-10 right-10 bg-gray-600 cursor-pointer text-white p-3 rounded-full"
    >
      <ArrowUp />
    </div>
  );
};
export default ScrollToTop;