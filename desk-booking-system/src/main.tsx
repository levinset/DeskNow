//impoert libraries
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserLandingPage from "./pages/UserLandingPage.tsx";
import OfficesListPage from "./pages/OfficesListPage.tsx";
import OfficePage from "./pages/OfficePage.tsx";
import SuccessBooked from "./pages/SuccessBooked.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import AdminPanel from "./pages/admin/AdminPanel.tsx";
import LoginLoading from "./pages/LoginLoading.tsx";

//
// Create a client
const queryClient = new QueryClient();
//routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/loginloading",
    element: <LoginLoading />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/userlanding",
    element: <UserLandingPage />,
  },
  {
    path: "/offices",
    element: <OfficesListPage />,
  },
  {
    path: "/office",
    element: <OfficePage />,
  },
  {
    path: "/sucssesfullbooked",
    element: <SuccessBooked />,
  },
  {
    path: "/profile",
    element: <UserProfilePage />,
  },
  {
    path: "/admin/adminpanel",
    element: <AdminPanel />,
  },
]);

//main component
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
