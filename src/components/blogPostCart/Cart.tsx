import { Link, useNavigate } from "react-router-dom";
import Post from "../../types/Post";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function Cart({ cart }: { cart: Post }) {
  const navigate = useNavigate();
  return (
    <div className="flex mb-16 gap-8 h-52 relative">
      <div className="border border-gray-200 flex-4/12 rounded-xl overflow-hidden ">
        <img
          className="h-full w-full object-cover opacity-90 transition-transform hover:scale-125"
          src={cart.thumbnailURL}
          alt={cart.title}
        />
      </div>
      <div className="flex-8/12 p-5">
        <div className="flex flex-wrap gap-2 mb-3 absolute -top-2">
          {cart.tags.map((tag) => {
            return (
              <Badge variant={"secondary"}>
                <Link
                  to="#"
                >
                  {tag}
                </Link>
              </Badge>
            );
          })}
        </div>
        <h2 className="text-2xl font-semibold mb-2">{cart.title}</h2>
        <p className="text-gray-400 mb-2 line-clamp-2">{cart.shortDesc}</p>
        <small className="text-sm text-gray-500 block mb-4">
          <i>
            Ngày đăng:{" "}
            {new Date(cart.createDate as string).toLocaleDateString()}
          </i>
        </small>
        <div className="text-right">
          <Button onClick={() => navigate("/blog/" + cart.id)} size={"lg"}>
            Xem thêm
          </Button>
        </div>
      </div>
    </div>
  );
}
