import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Orders from "./pages/Orders";
import RegisterProduct from "./pages/RegisterProduct";
import RegisterOrder from "./pages/RegisterOrder/index.jsx";
import ClientList from "./pages/ClientList";
import RegisterClient from "./pages/RegisterClient";
import Auth from "./pages/Auth/index.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from "./pages/User/index.jsx";
import Invoice from "./pages/Invoice/index.jsx";
import RegisterCategory from "./pages/RegisterCategory/index.jsx";
import CategoryList from "./pages/CategoryList/index.jsx";

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <Auth />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Orders",
        element: <Orders />,
      },
      {
        path: "/ProductList",
        element: <ProductList />,
      },
      {
        path: "/ProductList/RegisterProduct",
        element: <RegisterProduct />,
      },
      {
        path: "/ProductList/RegisterProduct/:id",
        element: <RegisterProduct />,
      },
      {
        path: "/Orders/RegisterOrder/:id",
        element: <RegisterOrder />,
      },
      {
        path: "/ClientList",
        element: <ClientList />,
      },
      {
        path: "/ClientList/RegisterClient",
        element: <RegisterClient />,
      },
      {
        path: "/ClientList/RegisterClient/:id",
        element: <RegisterClient />,
      },
      {
        path: "User",
        element: <User />,
      },
      {
        path: "/Orders/RegisterOrder",
        element: <RegisterOrder />,
      },
      {
        path: "/Invoice",
        element: <Invoice />,
      },
      {
        path: "/Category/RegisterCategory",
        element: <RegisterCategory />,
      },
      {
        path: "/Category/:id",
        element: <RegisterCategory />,
      },
      {
        path: "/Category",
        element: <CategoryList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
