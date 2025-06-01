import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createUser } from "@/service/userService";
import { Role, UserType } from "@/types/UserType";
import { getDateNow } from "@/utils/date";
import { Label } from "@radix-ui/react-label";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const auth = getAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const isValid = () => {
    if (confirmPassword !== password) return false;
    return true;
  }

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userData: UserType = {
        creationTime: user.metadata.creationTime || getDateNow(),
        email: user.email as string,
        lastSignIn: user.metadata.lastSignInTime || "",
        name: user.displayName || "",
        photoURL: user.photoURL || "",
        providerId: user.providerId || "",
        uid: user.uid,
        role: Role.USER,

        follower: 0,
        following: 0,
        numberOfPost: 0,
        numberOfVote: 0,
        viewOfPost: 0,
      };

      await createUser(userData);

      toast.success("Tạo tài khoản thành công");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Đăng ký tài khoản</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        type="email"
                        placeholder="codedump@gmail.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="confirm-password">
                          Confirm password
                        </Label>
                      </div>
                      <Input
                        id="confirm-password"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <span
                        className="text-red-500"
                        style={{
                          display:
                            isValid() ? "none" : "inline",
                        }}
                      >
                        Mật khẩu không trùng khớp
                      </span>
                    </div>
                    <Button disabled={!isValid()} type="submit" className="w-full">
                      Sign up
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Nếu bạn đã có tài khoản?{" "}
                    <Link
                      to={"/login"}
                      className="underline underline-offset-4"
                    >
                      Login
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
