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

// Global boolean variable indicating whether the user is authenticated
const isAuthenticated = true;

// ProtectedRoute HOC
const ProtectedRoute = ({ element, path }: any) => {
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/auth" replace state={{ from: path }} />
  );
};

const App = () => {
  const Layout = () => {
    const isRootRoute = window.location.pathname === "/";
    return (
      <div className="main">
        {isRootRoute ? null : <Navbar />}
        <div className="container">
          {isRootRoute ? null : (
            <div className="menu-container">
              <Sidebar />
            </div>
          )}
          <div className="content-container">
            {<Outlet /> || <Navigate to="/auth" />}
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
