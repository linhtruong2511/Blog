import { useAppSelector } from "@/store/hook";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import LoaderScreen from "../loader/LoaderScreen";
import { Role } from "@/types/UserType";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const auth = useAppSelector((s) => s.authReducer);

  console.log(auth.user?.role);

  if (auth.loading) return <LoaderScreen />; 
  if (auth.isAuthenticated === false) return <Navigate to={"/login"} replace />;
  if (auth.user?.role !== Role.ADMIN) return <Navigate to={'/'} replace/>

  return children;
}
