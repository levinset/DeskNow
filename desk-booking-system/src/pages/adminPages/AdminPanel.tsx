import { useState } from "react";
import { useUpdateUserProfile } from "../../hooks/userHooks/users/UseUpdateUserProfile";
import UserProfileSection from "../../components/user/profile/UserProfileSection";
import EditProfileForm from "../../components/user/profile/EditProfileForm";
import { UserInputType } from "../../types/UserInputType";
import { useGetUserProfile } from "../../hooks/userHooks/users/useGetUserProfile";
import { useNavigate } from "react-router-dom";

// Components
import AdminHeader from "../../components/admin/home/AdminHeader";
import ManageComments from "../../components/admin/adminPanel/ManageComments";
import ManageFixDeskRequests from "../../components/admin/adminPanel/ManageFixDeskRequests";
import ManageOffices from "../../components/admin/adminPanel/ManageOfiices";
import ManageDesks from "../../components/admin/adminPanel/ManageDesks";
import ManageUsers from "../../components/admin/adminPanel/ManageUsers";

const AdminPanel = () => {
  const { data: userData } = useGetUserProfile();
  const [editing, setEditing] = useState(false);
  const [showOptions, setShowOptions] = useState("A");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { mutate: updateUserProfile } = useUpdateUserProfile();
  const navigate = useNavigate();

  const onSubmit = async (formData: UserInputType) => {
    try {
      const userId = userData.id;
      await updateUserProfile(
        { userId, data: formData },
        {
          onSuccess: () => {
            window.location.reload();
          },
        }
      );
      setEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  let componentToRender;
  switch (showOptions) {
    case "A":
      componentToRender = <UserProfileSection />;
      break;
    case "B":
      componentToRender = <EditProfileForm onSubmit={onSubmit} />;
      break;
    case "C":
      componentToRender = <ManageComments />;
      break;
    case "D":
      componentToRender = <ManageFixDeskRequests />;
      break;
    case "E":
      componentToRender = <ManageOffices />;
      break;
    case "F":
      componentToRender = <ManageDesks />;
      break;
    case "G":
      componentToRender = <ManageUsers />;
      break;
    default:
      componentToRender = <div>No matching component found</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/DeskNow");
  };

  return (
    <div>
      <AdminHeader />
      <div className="flex flex-col h-screen gap-5 p-10 md:flex-row">
        {/* Sidebar */}
        <div>
          <button
            onClick={toggleMenu}
            className="absolute z-10 block p-2 text-white bg-gray-800 rounded-md md:hidden top-10 right-10"
          >
            Menu
          </button>
          <aside
            className={`w-full h-full ${
              isMenuOpen ? "block" : "hidden"
            } md:block text-white bg-white rounded-lg shadow-lg`}
          >
            <div className="p-4">
              <h2 className="text-2xl font-bold text-black">Admin Dashboard</h2>
            </div>
            <nav className="flex flex-col mt-4">
              <ul className="space-y-1">
                <li>
                  <div
                    onClick={() => setShowOptions("A")}
                    className="flex items-center gap-10 px-4 py-2 rounded-lg hover:cursor-pointer"
                  >
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
                    <button className="text-sm font-medium text-purple-700">
                      Admin Dashboard
                    </button>
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => setShowOptions("C")}
                    className="flex items-center gap-10 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 bg-blue-500 rounded-md"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <button className="text-sm font-medium text-black">
                      Manage Comments
                    </button>
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => setShowOptions("D")}
                    className="flex items-center gap-10 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 bg-green-500 rounded-md"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c-1.012 0-1.867.668-2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                      />
                    </svg>
                    <button className="text-sm font-medium text-black">
                      Manage FixDesk Requests
                    </button>
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => setShowOptions("E")}
                    className="flex items-center gap-10 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 bg-red-500 rounded-md"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                      />
                    </svg>
                    <button className="text-sm font-medium text-black">
                      Manage Offices
                    </button>
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => setShowOptions("F")}
                    className="flex items-center gap-10 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 bg-blue-500 rounded-md"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                      />
                    </svg>
                    <button className="text-sm font-medium text-black">
                      Manage Desks
                    </button>
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => setShowOptions("G")}
                    className="flex items-center gap-10 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 bg-purple-500 rounded-md"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <button className="text-sm font-medium text-black">
                      Manage Users
                    </button>
                  </div>
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
        </div>
        {/* Main Content */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">
              Welcome,{" "}
              {userData && `${userData.firstname} ${userData.lastname}`}
            </h1>
            {!editing && (
              <button
                onClick={() => setShowOptions("B")}
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
    </div>
  );
};

export default AdminPanel;
