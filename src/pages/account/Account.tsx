import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import UserPhoto from "@/assets/user.svg";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Edit, Loader2, Settings } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import General from "@/components/general/General";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/service/userService";
import { toast } from "react-toastify";
import { updateAuthUser } from "@/reducer/authReducer";
import { uploadToCloudinary } from "@/service/cloudinaryService";

const Account = () => {
  const { user } = useAppSelector((s) => s.authReducer);

  const menuItem = [
    {
      id: 0,
      name: "Bài viết",
      link: "",
      onClick: () => {},
    },
    {
      id: 0,
      name: "Series",
      link: "a",
      onClick: () => {},
    },
    {
      id: 0,
      name: "Bookmark",
      link: "b",
      onClick: () => {},
    },
    {
      id: 0,
      name: "Đang theo dõi",
      link: "c",
      onClick: () => {},
    },
    {
      id: 0,
      link: "d",
      name: "Người theo dõi",
      onClick: () => {},
    },
    {
      id: 0,
      link: "d",
      name: "Thông tin tài khoản",
      onClick: () => {},
    },
  ];

  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined>(user?.name || "No name");
  const dispath = useAppDispatch();
  const [isLoadingUploadPhoto, setIsLoadingUploadPhoto] = useState(false);

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
    <div className=" my-5">
      <div className="max-w-[1120px]  mx-auto flex items-center gap-4">
        <div className="border rounded-full p-2 relative group">
          <Avatar className="size-18">
            {isLoadingUploadPhoto ? (
              <Loader2
                className="animate-spin top-1/2 left-1/2 -translate-1/2 absolute"
                size={50}
              />
            ) : (
              <AvatarImage src={user?.photoURL || UserPhoto}></AvatarImage>
            )}
          </Avatar>
          <label htmlFor="photoURL">
            <Settings
              className="absolute hidden group-hover:block top-10/12 left-2/3 z-10 hover:text-blue-500"
              size={20}
            />
          </label>

          <input
            type="file"
            className="hidden"
            id="photoURL"
            accept="image/*"
            onChange={(e) => handleChangePhotoURL(e)}
          />
        </div>
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
                    setName(user?.name || "No name");
                  }}
                >
                  Thoát
                </Button>
              </div>
            ) : (
              <>
                <h2>{user?.name || "No name"}</h2>
                <Edit size={14} onClick={() => setIsEditName(true)} />
              </>
            )}
          </div>
          <h3 className="text-gray-500">{user?.email}</h3>
        </div>
      </div>

      <hr className="mt-5" />

      <div className=" flex items-center gap-10 text-gray-600 shadow-sm lg:px-50 overflow-auto">
        {menuItem.map((item) => (
          <>
            <NavLink
              to={item.link}
              className="p-2 hover:text-blue-500 transition-colors cursor-pointer text-nowrap"
              onClick={item.onClick}
              key={item.id}
            >
              {item.name}
            </NavLink>
          </>
        ))}
      </div>

      <div className="mx-auto max-w-[1120px] my-5 flex justify-between">
        <div className="flex-7/12">
          <Outlet></Outlet>
        </div>

        {/* Bảng thông số chung */}
        <General />
      </div>
    </div>
  );
};

export default Account;
