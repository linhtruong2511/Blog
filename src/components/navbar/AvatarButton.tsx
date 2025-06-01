import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import User from "@/assets/user.svg";
import { logout } from "@/reducer/authReducer";
import { Role } from "@/types/UserType";
const AvatarButton = () => {
  const auth = getAuth();
  const { user } = useAppSelector((s) => s.authReducer);
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
    dispath(logout());
    navigate("/");
  };

  if (!user)
    return (
      <>
        <Link to={"/login"}>Đăng nhập</Link>
      </>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="">
          {user?.photoURL ? (
            <AvatarImage className="" src={user.photoURL} />
          ) : (
            <AvatarImage src={User} />
          )}
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("account")}>
          Tài khoản
        </DropdownMenuItem>
        <DropdownMenuItem>Viết bài</DropdownMenuItem>
        {user.role === Role.ADMIN && (
          <DropdownMenuItem onClick={() => navigate("/admin")}>
            Console
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarButton;
