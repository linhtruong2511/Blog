import { useRef } from "react";
import { LiaSearchSolid } from "react-icons/lia";

export default function Search() {
  const iconRef = useRef<HTMLSpanElement | null>(null);
  
  const handleFocusInput = () => {
    iconRef.current?.classList.add("translate-0.5");
  };

  const handleBlurInput = () => {
    iconRef.current?.classList.remove("translate-0.5");
  };

  return (
    <form className="w-full relative focus:translate-0.5">
      <input
        type="text"
        className="border border-gray-200 p-2 pr-12 rounded-md w-full 
          transition-all text-black outline-none
          focus:shadow-md focus:translate-0.5 
          "
        placeholder="Search..."
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
      />
      <span
        className="absolute text-black top-3 right-2 cursor-pointer transition-all"
        ref={iconRef}
      >
        <LiaSearchSolid size={20} />
      </span>
    </form>
  );
}
