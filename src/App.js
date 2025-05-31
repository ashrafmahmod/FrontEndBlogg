import Header from "./componnents/header/Header";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Posts from "./pages/posts-page/PostsPage.jsx";
import CreatePost from "./pages/create-post/CreatePost.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Login from "./pages/forms/Login.jsx";
import Register from "./pages/forms/Register.jsx";
import Footer from "./componnents/footer/Footer.jsx";
import PostDetails from "./pages/postDetails/PostDetails.jsx";
import { ToastContainer } from "react-toastify";
import Category from "./pages/category/Category.jsx";
import Profile from "./pages/profile/Profile.jsx";
import UsersTable from "./pages/admin/UsersTable.jsx";
import PostsTable from "./pages/admin/PostTable.jsx";
import CategoriesTable from "./pages/admin/CategoriesTable.jsx";
import CommentsTable from "./pages/admin/CommentsTable.jsx";
import ForgotPassword from "./pages/forms/ForgotPassword.jsx";
import ResetPassword from "./pages/forms/ResetPassword.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verify-email/VerifyEmail.jsx";
function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      {/* instead i use it in many components  */}
      <ToastContainer theme="colored" position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={"/"} />}
        />
        <Route
          path="/users/:userId/verify/:token"
          element={!user ? <VerifyEmail /> : <Navigate to={"/"} />}
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:userId/:token"
          element={<ResetPassword />}
        />
        <Route path="/profile/:id" element={<Profile />} />
        {/* <Route path="/posts" element={<Posts />} />
        <Route path="/posts/create-post" element={<CreatePost />} />
        <Route path="/posts/details/:id" element={<PostDetails />} />
        <Route path="/posts/categories/:category" element={<Category />} /> */}

        <Route path="posts">
          <Route index element={<Posts />} />
          <Route
            path="create-post"
            element={user ? <CreatePost /> : <Navigate to={"/"} />}
          />
          <Route path="details/:id" element={<PostDetails />} />
          <Route path="categories/:category" element={<Category />} />
        </Route>

        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/users-table" element={<UsersTable />} />
        <Route path="/admin-dashboard/posts-table" element={<PostsTable />} />
        <Route
          path="/admin-dashboard/categories-table"
          element={<CategoriesTable />}
        />
        <Route
          path="/admin-dashboard/comments-table"
          element={<CommentsTable />}
        /> */}

        <Route path="admin-dashboard">
          <Route
            index
            element={user?.isAdmin ? <AdminDashboard /> : <Navigate to={"/"} />}
          />
          <Route
            path="users-table"
            element={user?.isAdmin ? <UsersTable /> : <Navigate to={"/"} />}
          />
          <Route
            path="posts-table"
            element={user?.isAdmin ? <PostsTable /> : <Navigate to={"/"} />}
          />
          <Route
            path="categories-table"
            element={
              user?.isAdmin ? <CategoriesTable /> : <Navigate to={"/"} />
            }
          />
          <Route
            path="comments-table"
            element={user?.isAdmin ? <CommentsTable /> : <Navigate to={"/"} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
