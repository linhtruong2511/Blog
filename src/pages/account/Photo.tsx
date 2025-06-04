import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/types/UserType";
import { Loader2, Settings } from "lucide-react";
import { ChangeEvent, useState } from "react";
import UserPhoto from "@/assets/user.svg";
import { uploadToCloudinary } from "@/service/cloudinaryService";
import { useAppDispatch } from "@/store/hook";
import { updateUser } from "@/service/userService";
import { updateAuthUser } from "@/reducer/authReducer";
import { toast } from "react-toastify";
interface Props {
  author: UserType;
  user: UserType;
  itMe: boolean;
}
const Photo = ({ itMe, author, user }: Props) => {
  const [isLoadingUploadPhoto, setIsLoadingUploadPhoto] = useState(false);
  const dispath = useAppDispatch();

  const handleChangePhotoURL = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoadingUploadPhoto(true);
    const file: File | undefined | null = e.target.files?.item(0);
    if (!file) return;

    const url = await uploadToCloudinary(file);

    if (
      url &&
      url !== "" &&
      (await updateUser({ photoURL: url }, user?.uid as string))
    ) {
      dispath(
        updateAuthUser({
          photoURL: url,
        })
      );
      setIsLoadingUploadPhoto(false);
      toast("Cập nhật thành công !");
    } else {
      toast("Lỗi đường truyền !");
    }
  };

  return (
    <div className="border rounded-full p-2 relative group">
      <Avatar className="size-18">
        {isLoadingUploadPhoto ? (
          <Loader2
            className="animate-spin top-1/2 left-1/2 -translate-1/2 absolute"
            size={50}
          />
        ) : (
          <AvatarImage src={author?.photoURL || UserPhoto}></AvatarImage>
        )}
      </Avatar>
      {itMe && (
        <label htmlFor="photoURL">
          <Settings
            className="absolute hidden group-hover:block top-10/12 left-2/3 z-10 hover:text-blue-500"
            size={20}
          />
        </label>
      )}

      <input
        type="file"
        className="hidden"
        id="photoURL"
        accept="image/*"
        onChange={(e) => handleChangePhotoURL(e)}
      />
    </div>
  );
};

export default Photo;
