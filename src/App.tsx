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
import supabase from "./config/client";
import { useEffect, useState } from "react";

const App = () => {
  //GLobal Auth value
  /* changed from using context because data is lost when reloaded*/
  const { isAuth } = useAuthContext();

  //Auth State
  const [authenticated, setAuthentication] = useState(false);
  const [layout, setLayout] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      const session = data?.session;
      console.log(session);

      if (session) {
        setAuthentication(true);
      } else if (!session) {
      } else {
      }
    };

    checkSession();
  }, []);

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
function useAuth(): { session: any; signOut: any } {
  throw new Error("Function not implemented.");
}
