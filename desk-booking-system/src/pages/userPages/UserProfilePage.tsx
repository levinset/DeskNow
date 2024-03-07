//import libraries and components
import { useState } from "react";
import { useUpdateUserProfile } from "../../hooks/userHooks/users/UseUpdateUserProfile";
import UserProfileSection from "../../components/user/profile/UserProfileSection";
import EditProfileForm from "../../components/user/profile/EditProfileForm";
import { useGetUserProfile } from "../../hooks/userHooks/users/useGetUserProfile";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../components/user/home/UserHeader";
import Footer from "../../components/general/Footer";
import { useQueryClient } from "@tanstack/react-query";
import BookedView from "./../../components/user/dashboard/bookedDesk/BookedView";
import Favourites from "../../components/user/dashboard/favourite/Favourites";

//types
import { UserInputType } from "../../types/UserInputType";

//main component
const UserProfilePage = () => {
  const { data: userData } = useGetUserProfile();
  const [editing, setEditing] = useState(false);
  const [showOptions, setshowOptions] = useState("profile");
  const { mutate: updateUserProfile } = useUpdateUserProfile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSubmit = async (formData: UserInputType) => {
    try {
      const userId = userData.id;
      await updateUserProfile(
        { userId, data: formData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["userprofile"],
            });
          },
        }
      );
      setEditing(false);
      setshowOptions("profile");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  //handle sidebar Menue
  let componentToRender;
  switch (showOptions) {
    case "profile":
      componentToRender = <UserProfileSection />;
      break;
    case "editprofile":
      componentToRender = <EditProfileForm onSubmit={onSubmit} />;
      break;
    case "reservation":
      componentToRender = (
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-bold text-center text-black ">
            Your Booked Desks:
          </h1>
          <div className="flex flex-row justify-center">
            <BookedView />
          </div>
        </div>
      );
      break;
    case "favourites":
      componentToRender = <Favourites slide={3} width=" w-[70vw] " />;

      break;
    case "E":
      componentToRender = "";
      break;
    case "F":
      componentToRender = "";
      break;
    case "G":
      componentToRender = "";
      break;
    default:
      componentToRender = <div>No matching component found</div>;
  }
  //handle logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    queryClient.invalidateQueries({
      queryKey: ["userprofile"],
    });
    navigate("/");
  };

  return (
    <div>
      <UserHeader />
      <div className="flex flex-col min-h-screen gap-5 p-10 lg:flex-row">
        <div className="items-center justify-between hidden mb-4 max-lg:flex">
          <h1 className="text-2xl font-bold">
            Welcome,{" "}
            <span className="capitalize text-violet-600">
              {" "}
              {userData && userData.firstname}
            </span>
          </h1>
          {!editing && (
            <button
              onClick={() => setshowOptions("editprofile")}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>
        {/* Sidebar */}
        <aside className="w-1/4 text-white bg-white rounded-lg shadow-lg max-lg:w-full ">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-black">User Dashboard</h2>
          </div>
          <nav className="flex flex-col mt-4 ">
            <ul className="space-y-1">
              <li onClick={() => setshowOptions("profile")} className="">
                <button className="flex items-center gap-10 px-4 py-2 rounded-lg ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 bg-purple-600 rounded-md"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                    />
                  </svg>

                  <span className="text-sm font-medium text-purple-700">
                    {" "}
                    Profile{" "}
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => setshowOptions("reservation")}
                  className="flex items-center gap-10 px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 bg-blue-300 rounded-md"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                    />
                  </svg>

                  <span className="text-sm font-medium text-black">
                    {" "}
                    Reservation{" "}
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => setshowOptions("favourites")}
                  className="flex items-center gap-10 px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 bg-purple-300 rounded-md size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>

                  <span className="text-sm font-medium text-black">
                    {" "}
                    Favourites{" "}
                  </span>
                </button>
              </li>
            </ul>
            <button
              onClick={handleLogout}
              className="px-4 py-2 mt-4 text-3xl font-bold text-black uppercase hover:bg-red-400 hover:text-white"
            >
              LogOut
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ">
          <div className="flex items-center justify-between mb-4 max-lg:hidden">
            <h1 className="text-2xl font-bold">
              Welcome,{" "}
              <span className="capitalize text-violet-600">
                {" "}
                {userData && userData.firstname}
              </span>
            </h1>
            {!editing && (
              <button
                onClick={() => setshowOptions("editprofile")}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
          </div>
          {/* Profile Section */}
          <div>{componentToRender}</div>
        </main>
      </div>
      <div className="item-end ">
        <Footer />
      </div>
    </div>
  );
};

export default UserProfilePage;
