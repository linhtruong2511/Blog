import { Avatar, AvatarImage } from "@/components/ui/avatar";
import PostType from "@/types/PostType";
import { UserType } from "@/types/UserType";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
  post: PostType,
  author: UserType
}


const ArticleInformation = ({post, author} : Props) => {
  return (
    <div className="flex justify-between ">
      <div className="flex gap-5">
        <div>
          <Avatar>
            <AvatarImage
              src={author?.photoURL}
              className="h-16 w-16 object-cover rounded-full"
            />
          </Avatar>
        </div>
        <div>
          <h1 className="text-2xl lg:text-4xl font-[Montserrat]">
            <b>{post?.title}</b>
          </h1>

          <div className="flex gap-10 mt-1">
            <p>Lần cập nhật cuối: {post?.lastUpdate}</p>
            <p className="flex gap-2 items-center">
              {" "}
              <FaEye className="inline" /> {post?.view}
            </p>
          </div>
        </div>
      </div>
      <div className="text-right">
        Tác giả:{" "}
        <Link to={"/account/" + author?.uid}>
          <span
            style={{ fontStyle: "italic" }}
            className="mb-5 text-blue-500 hover:text-blue-600 active:text-blue-700"
          >
            {author?.name}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ArticleInformation;
