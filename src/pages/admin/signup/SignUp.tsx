import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FormEvent, FormEventHandler, useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const auth = getAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // linhtk2511044@gmail.com
      // access token: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZlNjVjY2I4ZWFkMGJhZWY1ZmQzNjE5NWQ2NTI4YTA1NGZiYjc2ZjMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGVyc29uYWwtYmxvZy00N2ZiZiIsImF1ZCI6InBlcnNvbmFsLWJsb2ctNDdmYmYiLCJhdXRoX3RpbWUiOjE3NDg1MTE1OTQsInVzZXJfaWQiOiJLS0VQdGFaVUtHZVVjZHhONzNmTGJmcDNLWnAyIiwic3ViIjoiS0tFUHRhWlVLR2VVY2R4TjczZkxiZnAzS1pwMiIsImlhdCI6MTc0ODUxMTU5NCwiZXhwIjoxNzQ4NTE1MTk0LCJlbWFpbCI6Imxpbmh0azI1MTEwNDRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImxpbmh0azI1MTEwNDRAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.FX0kzSKtzgzEvEDNcdvCNzhc4efc_vh-m2paf6OeWlsF2z0zN6_HkaHX2JmcIgIFWcZLCPrAiTGruuKUEhM3ZV9Wt6Y0PGzBc25Ox70SuKils5NW3JkeaufOREtRYVT5zv-k6T3JdWlzX8cSs7UCjV9qnbMUTiZCpSjQLUvhsp-WCN374vfdYbP40eVkOeif_XBxyknfsassjNCWF6ydlIymZxnLOiT61wzmbKEsXUi5NT02lCzFsVZaS2vGwQdPKf_nC7buoYSa_qKTxA3wSSRsH_6YZxH39g_TI1NN4cWUbHiWr9t5t9szK9W4val7Ch-M712VTm3rN-IjKpkzow"
      // uid: "KKEPtaZUKGeUcdxN73fLbfp3KZp2"
      
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
                    </div>
                    <Button type="submit" className="w-full">
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
