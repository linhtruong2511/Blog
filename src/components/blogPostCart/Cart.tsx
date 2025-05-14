import { Link, Navigate, useNavigate } from "react-router-dom";
import Post from "../../types/Post";

export default function Cart({ cart }: { cart: Post }) {
  const navigate = useNavigate();
  return (
    <div className="flex mb-16 gap-8 h-52 overflow-hidden">
      <div className="border border-gray-200 flex-4/12 rounded-xl overflow-hidden ">
        <img
          className="h-full w-full object-cover opacity-90 transition-transform hover:scale-125"
          src={cart.thumbnailURL}
          alt={cart.title}
        />
      </div>
      <div className="flex-8/12 p-5">
        <div className="flex flex-wrap gap-5 mb-3">
          {cart.tags.map((tag) => {
            return (
              <Link
                to="#"
                className="inline-block bg-amber-50 text-black py-0.5 px-3 rounded-md"
              >
                {tag}
              </Link>
            );
          })}
        </div>
        <h2 className="text-2xl font-semibold mb-2">{cart.title}</h2>
        <p className="text-gray-400 mb-2 line-clamp-2">
          {cart.shortDesc}
        </p>
        <small className="text-sm text-gray-500 block mb-4">
          <i>
            Ngày đăng:{" "}
            {new Date(cart.createDate as string).toLocaleDateString()}
          </i>
        </small>
        <div className="text-right">
          <button onClick={() => navigate("/blog/" + cart.id)} className="btn">
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  );
}
