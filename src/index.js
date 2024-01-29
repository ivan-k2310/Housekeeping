import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./comps/Login";
import RouteAuth from "./comps/RouteAuth";
import { ErrorPage } from "./comps/ErrorPage";
import { DashBoard } from "./comps/DashBoard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <RouteAuth />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/create",
        element: <DashBoard />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
