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
import DesksAllPage from "./pages/DesksAllPage.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";

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
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/userprofile",
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
    path: "/profile",
    element: <UserProfilePage />,
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
