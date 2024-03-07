import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/Home/LandingPage";
import LoginPage from "./pages/Home/LoginPage";
import RegisterPage from "./pages/Home/RegisterPage";
import UserLandingPage from "./pages/userPages/UserLandingPage";
import OfficesListPage from "./pages/userPages/OfficesListPage";
import OfficePage from "./pages/userPages/OfficePage";
import SuccessBooked from "./pages/userPages/SuccessBooked";
import UserProfilePage from "./pages/userPages/UserProfilePage";
import AdminPanel from "./pages/adminPages/AdminPanel";
import LoginLoading from "./pages/Home/LoginLoading";
import "./index.css";
import { useTokenRefresh } from "./hooks/userHooks/users/useTokenRefresh";
import { AxiosError } from "axios";

// Routes
const router = createBrowserRouter([
  {
    path: "/DeskNow",
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
