//import libraries and components
import Header from "../../components/general/Header";
import UserHeader from "../../components/user/home/UserHeader";
import AdminHeader from "../../components/admin/home/AdminHeader";
import { useGetUserProfile } from "../../hooks/userHooks/users/useGetUserProfile";

//
export default function HeaderView() {
  //
  //handle direction
  const { data, isError, isLoading, error } = useGetUserProfile();
  const token = localStorage.getItem("accessToken");
  return (
    <div>
      {/* Conditionally render different header components based on user */}
      {data && token && data.isAdmin ? (
        <AdminHeader />
      ) : data && token ? (
        <UserHeader />
      ) : (
        <Header />
      )}
      <div className="hidden ">
        {isLoading && <div>Loading...</div>}{" "}
        {isError && <div>Error: {error.message}</div>}{" "}
      </div>
    </div>
  );
}
