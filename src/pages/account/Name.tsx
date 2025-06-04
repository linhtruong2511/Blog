import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateAuthUser } from "@/reducer/authReducer";
import { updateUser } from "@/service/userService";
import { useAppDispatch } from "@/store/hook";
import { UserType } from "@/types/UserType";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
interface Props {
  author: UserType;
  itMe: boolean;
  user: UserType
}
const Name = ({ author, itMe, user }: Props) => {
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined>(author?.name);
  const dispath = useAppDispatch();
  const handleSaveName = async () => {
    setIsEditName(false);

    if (user?.uid === undefined) {
      console.log("user uid is undefine");
      return;
    }

    const isUpdated = await updateUser(
      {
        name: name,
      },
      user.uid
    );

    if (isUpdated) {
      toast.success("Cập nhật thành công !");
      dispath(updateAuthUser({ name: name }));
    } else {
      toast.error("Lỗi đường truyền !");
    }
  };
  return (
    <div>
      <div className="flex items-center gap-4">
        {isEditName ? (
          <div className="flex gap-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>
            <Button variant={"ghost"} size={"sm"} onClick={handleSaveName}>
              Lưu
            </Button>
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => {
                setIsEditName(false);
                setName(author?.name || "No name");
              }}
            >
              Thoát
            </Button>
          </div>
        ) : (
          <>
            <h2>{author?.name || "No name"}</h2>
            {itMe && <Edit size={14} onClick={() => setIsEditName(true)} />}
          </>
        )}
      </div>
      <h3 className="text-gray-500">{author?.email}</h3>
    </div>
  );
};

export default Name;
