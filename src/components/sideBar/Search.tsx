import { set } from "@/reducer/postReducer";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import PostType from "@/types/PostType";
import { useEffect, useRef, useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";

export default function Search() {
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const posts = useAppSelector((s) => s.postReducer);
  const [postSearch, setPostSearch] = useState<PostType[]>([]);
  const dispath = useAppDispatch();

  const handleFocusInput = () => {
    iconRef.current?.classList.add("translate-0.5");
  };

  const handleBlurInput = () => {
    iconRef.current?.classList.remove("translate-0.5");
  };

  const handleSearch = (keyword: string) => {
    dispath(
      set(
        postSearch.filter((item) =>
          item.title.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    );
  };

  useEffect(() => {
    setPostSearch(posts);
  }, [posts]);

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
        onChange={(e) => handleSearch(e.target.value)}
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
