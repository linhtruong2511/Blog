import { Link, useNavigate } from "react-router-dom";
import Post from "../../types/Post";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function Card({ cart }: { cart: Post }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/blog/" + cart.id)}
      className="flex pb-2 mb-4 md:mb-8 border-b-gray-200 border-b gap-2 md:h-52 relative "
    >
      <div className="border border-gray-200  flex-4/12 rounded-xl overflow-hidden hidden md:block ">
        <img
          className="h-full w-full object-cover opacity-90 transition-transform hover:scale-125"
          src={cart.thumbnailURL}
          alt={cart.title}
        />
      </div>
      <div className="flex-8/12 flex flex-col justify-between p-5 ">
        <div>
          <div className="flex flex-wrap gap-2 mb-3 absolute -top-2">
            {cart.tags.map((tag) => {
              return (
                <Badge variant={"secondary"} key={tag}>
                  <Link to="#">{tag}</Link>
                </Badge>
              );
            })}
          </div>
          <h2 className="text-2xl font-semibold mb-2">{cart.title}</h2>
          <p className="text-gray-400 mb-2 line-clamp-2">{cart.shortDesc}</p>
          <small className="text-sm text-gray-500 block mb-4">
            <i>Ngày đăng: {cart.createDate}</i>
          </small>
        </div>
        <div className="text-right hidden md:block">
          <Button onClick={() => navigate("/blog/" + cart.id)}>Xem thêm</Button>
        </div>
      </div>
    </div>
  );
}
