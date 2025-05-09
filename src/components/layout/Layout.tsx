import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="relative">
      <Navbar />

      <div className="content min-h-screen">
        <Outlet></Outlet>
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
