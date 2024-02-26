import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserProfile } from "../hooks/useGetUserProfile";

export default function LoginLoading() {
  const { data, isLoading, isError } = useGetUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isError) {
      if (data && data.isAdmin) {
        navigate("/admin/adminpanel");
      } else {
        navigate("/userlanding");
      }
    }
  }, [data, isLoading, isError, navigate]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching user profile</p>}
    </div>
  );
}
