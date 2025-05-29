import { useAppSelector } from "@/store/hook";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import LoaderScreen from "../loader/LoaderScreen";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const auth = useAppSelector((s) => s.authReducer);

  if (auth.loading) return <LoaderScreen />;
  if (auth.isAuthenticated === false) return <Navigate to={"/login"} replace />;

  return children;
}
