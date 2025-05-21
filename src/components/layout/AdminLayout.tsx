import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AdminSidebar } from "../adminSidebar/AdminSideBar";
export default function AdminLayout() {
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <main className="w-full p-3 min-h-screen">
          <Outlet></Outlet>
        </main>
      </SidebarProvider>
    </>
  );
}
