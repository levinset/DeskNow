//import libraries
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserProfile } from "../../hooks/userHooks/users/useGetUserProfile";

//main component
export default function LoginLoading() {
  //queries
  const { data, isLoading, isError } = useGetUserProfile();
  //navigate
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
