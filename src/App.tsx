import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import BLog from "./pages/blog/Blog";
import AllBlog from "./pages/allBlog/AllBlog";
import BlogInfor from "./pages/blogInfo/BlogInfor";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Nopage from "./pages/nopage/Nopage";
import Layout from "./components/layout/Layout";
import Provider from "./contexts/Provider";
import DashboardLayout from "./components/layout/DashboardLayout";
import CreateBlog from "./components/createBlog/CreateBlog";
import EditBlog from "./components/editBlog/EditBlog";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Draft from "./components/draftEdit/Draft";
function App() {
  return (
    <Provider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="blog/:id" element={<BLog />} />
            <Route path="blogs" element={<AllBlog />} />
            <Route path="bloginfo/:id" element={<BlogInfor />} />
          </Route>
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="draft" element={<Draft />}/>
            <Route path="createblog" element={<CreateBlog />} />
            <Route path="editblog/:postId" element={<EditBlog />} />
          </Route>
          <Route path="/*" element={<Nopage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
