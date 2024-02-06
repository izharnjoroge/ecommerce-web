import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  Navigate,
  redirect,
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
import supabase from "./config/client";
import { useEffect, useState } from "react";
import Orders from "./pages/orders/orders";

const App = () => {
  //GLobal Auth value
  /* changed from using context because data is lost when reloaded*/
  const { isAuth } = useAuthContext();

  //Auth State
  const [authenticated, setAuthentication] = useState<boolean | null>(null);
  const [layout, setLayout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        const session = data?.session;
        if (session) {
          setAuthentication(true);
          setLayout(true);
        } else {
          setAuthentication(false);
          setLayout(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setAuthentication(false);
        setLayout(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  // ProtectedRoute HOC
  const ProtectedRoute = ({ element, path }: any) => {
    return authenticated ? (
      element
    ) : (
      <Navigate to="/" replace state={{ from: path }} />
    );
  };

  const Layout = () => {
    return (
      <div className="main">
        {loading && <p>Loading...</p>}
        {!layout ? null : <Navbar />}
        <div className="container">
          {!layout ? null : (
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
          element: authenticated ? <Navigate to="/home" /> : <Auth />,
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
          path: "/orders",
          element: <ProtectedRoute element={<Orders />} />,
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
