import { useAppSelector } from "@/store/hook";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const auth = useAppSelector((s) => s.authReducer);

  console.log(auth);

  if (auth.loading)
    return (
      <>
        <div className="flex h-screen items-center flex-col justify-center">
          <Loader2 className="animate-spin" size={80} />
        </div>
        ;
      </>
    );
  if (auth.isAuthenticated === false) return <Navigate to={"/login"} replace />;

  return children;
}
