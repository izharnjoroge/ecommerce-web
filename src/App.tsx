import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/home";
import Create from "./pages/create/create";
import Update from "./pages/update/update";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import "./globals/main.scss";
import Auth from "./pages/auth/userCreation/auth";
import { useAuthContext } from "./authContext/auth_context";
import SignOut from "./pages/auth/signOut/signOut";

const App = () => {
  //GLobal Auth value
  const { isAuth } = useAuthContext();
  const isAuthenticated = isAuth;

  // ProtectedRoute HOC
  const ProtectedRoute = ({ element, path }: any) => {
    return isAuthenticated ? (
      element
    ) : (
      <Navigate to="/" replace state={{ from: path }} />
    );
  };

  const Layout = () => {
    return (
      <div className="main">
        {!isAuthenticated ? null : <Navbar />}
        <div className="container">
          {!isAuthenticated ? null : (
            <div className="menu-container">
              <Sidebar />
            </div>
          )}
          <div className="content-container">
            {<Outlet /> || <Navigate to="/" />}
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Auth />,
        },
        {
          path: "/home",
          element: <ProtectedRoute element={<Home />} />,
        },
        {
          path: "/create",
          element: <ProtectedRoute element={<Create />} />,
        },
        {
          path: "/:id",
          element: <ProtectedRoute element={<Update />} />,
        },
        {
          path: "/signOut",
          element: <ProtectedRoute element={<SignOut />} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
