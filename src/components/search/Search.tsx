import { LiaSearchSolid } from "react-icons/lia";
import Wrapper from "../sideBar/Wrapper";

export default function Search() {
  return (
    <Wrapper title="Search">
      <form className="w-full">
        <input
          type="text"
          className="border px-2 py-3 pr-16 rounded-md w-full bg-gray-400 focus:bg-gray-200 transition-colors text-black outline-none"
        />
        <LiaSearchSolid
          className="absolute text-black top-7 right-7 cursor-pointer"
          size={30}
        />
      </form>
    </Wrapper>
  );
}
