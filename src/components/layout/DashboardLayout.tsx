import NavBar from "../../pages/admin/dashboard/NavBar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <div className="flex items-start min-h-screen bg-white text-black">
        <NavBar />
        <main className="grow my-8 container mx-auto p-5">
          <Outlet></Outlet>
        </main>
      </div>
    </>
  );
}
