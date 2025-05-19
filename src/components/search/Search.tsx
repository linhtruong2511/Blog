import { LiaSearchSolid } from "react-icons/lia";

export default function Search() {
  return (
      <form className="w-full relative">
        <input
          type="text"
          className="border border-gray-200 p-2 pr-12 rounded-md w-full focus:bg-gray-100 
          transition-colors text-black outline-none
          focus:shadow-xl
          "
          placeholder="Search..."
        />
        <LiaSearchSolid
          className="absolute text-black top-3 right-2 cursor-pointer"
          size={20}
        />
      </form>
  );
}
