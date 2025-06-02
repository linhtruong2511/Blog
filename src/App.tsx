import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Home from "./pages/home/Home";
import BLog from "./pages/blog/Blog";
import AllBlog from "./pages/allBlog/AllBlog";
import BlogInfor from "./pages/blogInfo/BlogInfor";
import Login from "./pages/admin/login/Login";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Nopage from "./pages/nopage/Nopage";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import CreateBlog from "./pages/admin/createBlog/CreateBlog";
import EditBlog from "./pages/admin/editBlog/EditBlog";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Draft from "./pages/admin/draftEdit/Draft";
import UploadDraft from "./pages/admin/uploadDraft/UploadDraft";
import store from "./store";
import { Provider } from "react-redux";
import InitApp from "./components/initApp/InitApp";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import SignUp from "./pages/admin/signup/SignUp";
import Account from "./pages/account/Account";
import UserPost from "./components/userPost/UserPost";
import Edit from "./pages/edit/Edit";
import PostEditProvider from "./context/EditContext";
import Preview from "./pages/preview/Preview";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <InitApp />
        <ScrollToTop />

        <Routes>
          {/* public  */}
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="blog/:id" element={<BLog />} />
            <Route path="blogs" element={<AllBlog />} />
            <Route path="bloginfo/:id" element={<BlogInfor />} />

            <Route
              element={
                <PostEditProvider>
                  <Outlet />
                </PostEditProvider>
              }
            >
              <Route path="edit" element={<Edit />} />
              <Route path="preview" element={<Preview />} />
            </Route>

            <Route path="account" element={<Account />}>
              <Route path="" element={<UserPost />} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* protected */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<Dashboard />} />
            <Route path="draft" element={<Draft />} />
            <Route path="draft/upload/:postId" element={<UploadDraft />} />
            <Route path="createblog" element={<CreateBlog />} />
            <Route path="editblog/:postId" element={<EditBlog />} />
          </Route>

          {/* <Route path="test" element={<LayoutTest />}>
            <Route path="" element={<Dashboard />} />
          </Route> */}

          <Route path="/*" element={<Nopage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
