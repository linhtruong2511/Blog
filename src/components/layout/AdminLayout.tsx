import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import { AdminSidebar } from "../adminSidebar/AdminSideBar";
import { useEffect, useState } from "react";
import LoaderScreen from "../loader/LoaderScreen";
export default function AdminLayout() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [])

  return (
    <>
      {!loading ? (
        <SidebarProvider>
          <AdminSidebar />
          <main className="w-full p-3 min-h-screen">
            <Outlet></Outlet>
          </main>
        </SidebarProvider>
      ) : (
        <LoaderScreen />
      )}
    </>
  );
}
