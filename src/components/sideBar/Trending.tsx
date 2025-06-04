import { useAppSelector } from "@/store/hook";
import { Link } from "react-router-dom";

export default function Trending() {
  const posts = useAppSelector((s) => s.postReducer);
  const start = Math.random() * posts.length;
  const trending = posts.slice(Math.floor(start), Math.floor(start) + 3);
  return (
    <div>
      <h2 className="text-2xl font-semibold ">Top trending:</h2>
      <hr />
      <div>
        {trending.map((item) => (
          <Link to={"blog/" + item.id} key={item.id} className="w-full overflow-clip">
            <h3 className="text-nowrap truncate hover:text-blue-500">{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
