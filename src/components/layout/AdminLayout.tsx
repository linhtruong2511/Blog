import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import { AdminSidebar } from "../adminSidebar/AdminSideBar";
import { ToastContainer, Bounce } from "react-toastify";
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
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />

            <Outlet></Outlet>
          </main>
        </SidebarProvider>
      ) : (
        <LoaderScreen />
      )}
    </>
  );
}
