import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SinglePost from "./Pages/SinglePost";
import Write from "./Pages/Write";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ContactUs from "./Pages/ContactUs";
import { Products } from "./Pages/Products";
import { Error } from "./Pages/Error";

import "./style.scss";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
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
        path: "/post/:id",
        element: <SinglePost />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/*",
        element: <Error />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
