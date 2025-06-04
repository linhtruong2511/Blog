import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/store/hook";
import { useState } from "react";

const Comment = () => {
  const [comment, setComment] = useState<string>("");
  const { user } = useAppSelector ((s) => s.authReducer);

  return (
    <div className="">
      <h2 className="text-2xl font-medium">Bình luận</h2>
      <div>
        <div className="flex gap-5 mt-2">
          <Avatar>
            <AvatarImage
              src={user?.photoURL}
              className="h-14 w-14 rounded-full"
            />
          </Avatar>
          <Textarea
            className="grow border border-gray-400 h-32"
            name="comment"
            id=""
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></Textarea>
        </div>
        <div className="text-right mt-5">
          <Button disabled={comment === ""}>Gửi bình luận</Button>
        </div>
      </div>
      <Comment />
    </div>
  );
};

export default Comment;
