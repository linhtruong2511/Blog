import NavBar from "../../pages/admin/dashboard/NavBar";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AdminSidebar } from "../adminSidebar/AdminSideBar";
export default function AdminLayout() {
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <main className="w-full p-3">
          <SidebarTrigger />
          <div className="bg-gray-100 p-5 rounded-md mt-2">
            <Outlet></Outlet>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}
