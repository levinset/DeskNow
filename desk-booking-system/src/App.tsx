import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserLandingPage from "./pages/UserLandingPage";
import OfficesListPage from "./pages/OfficesListPage";
import OfficePage from "./pages/OfficePage";
import SuccessBooked from "./pages/SuccessBooked";
import UserProfilePage from "./pages/UserProfilePage";
import AdminPanel from "./pages/admin/AdminPanel";
import LoginLoading from "./pages/LoginLoading";
import "./index.css";
import { useTokenRefresh } from "./hooks/useTokenRefresh";
import { AxiosError } from "axios";

// Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
    path: "/office/:LocateOfficeId",
    element: <OfficePage />,
  },
  {
    path: "/sucssefullbooked",
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

// Main component
export default function App() {
  // Handle token refresh
  const { mutate: tokenRefresh } = useTokenRefresh();

  // Execute token refresh on component mount only for 400 or 401 errors
  useEffect(() => {
    const fetchData = async () => {
      try {
        await tokenRefresh();
      } catch (error: unknown) {
        // Specify the type of error
        if (isAxiosError(error)) {
          // Check if error is of type AxiosError
          const axiosError = error as AxiosError; // Narrow down the type to AxiosError
          if (
            axiosError.response &&
            (axiosError.response.status === 400 ||
              axiosError.response.status === 401)
          ) {
            await tokenRefresh();
          }
        }
      }
    };

    fetchData();

    // Cleanup function for useEffect
    return () => {};
  }, [tokenRefresh]);

  return <RouterProvider router={router} />;
}

// Function to check if the error is of type AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}
