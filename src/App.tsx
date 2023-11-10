import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/home";
import Create from "./pages/create/create";
import Update from "./pages/update/update";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import "./globals/main.scss";

const App = () => {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menu-container">
            <Sidebar />
          </div>
          <div className="content-container">
            <Outlet />
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
          element: <Home />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/:id",
          element: <Update />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
