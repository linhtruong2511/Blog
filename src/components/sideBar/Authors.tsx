import { getAllUser } from "@/service/userService";
import { UserType } from "@/types/UserType";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import UserPhoto from "@/assets/user.svg";
import { useNavigate } from "react-router-dom";
const Authors = () => {
  const [authors, setAuthors] = useState<UserType[]>();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(async () => {
      const authors = await getAllUser();
      if (!authors) {
        console.log("fetch author has error: ", authors);
        return;
      }
      setAuthors(authors);
    }, 0);
  }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold">Các tác giả hàng đầu: </h2>
      <hr />
      {authors?.map((item) => (
        <div className="flex items-center gap-5 mt-4" key={item.uid}>
          <Avatar>
            <AvatarImage
              className="h-12 object-cover w-12 rounded-full"
              src={item.photoURL || UserPhoto}
            />
          </Avatar>
          <div onClick={() => {navigate('account/' + item.uid)}} className="cursor-pointer">
            <h3 className="font-medium text-lg">{item.name}</h3>
            <p>Follower: {item.follower}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Authors;
