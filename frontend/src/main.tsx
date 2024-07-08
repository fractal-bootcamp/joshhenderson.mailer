import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/default-layout";
import Index from "./routes/index";
import SignIn from "./routes/sign-in";
import SignUp from "./routes/sign-up";
import DashboardLayout from "./layouts/dashboard-layout";
import Dashboard from "./routes/dashboard";

const routes = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [{ path: "/dashboard", element: <Dashboard /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
