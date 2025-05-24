import { Outlet } from "react-router-dom";
import { SidebarProvider} from "../ui/sidebar";
import { AdminSidebar } from "../adminSidebar/AdminSideBar";
import { ToastContainer, toast, Bounce } from 'react-toastify';
export default function AdminLayout() {
  return (
    <>
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
    </>
  );
}
