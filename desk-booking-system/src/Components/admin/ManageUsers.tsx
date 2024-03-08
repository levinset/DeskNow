import React, { useEffect, useState } from "react";
import { useGetAllUsers } from "../../hooks/admin-hooks/useGetAllUsers";
import PromoteUser from "./PromoteUser";
import { useDeleteUser } from "../../hooks/admin-hooks/useDeleteUser";
import { UserInputType } from "../../types/UserInputType";

type UserId = string;

const ManageUsers = () => {
  const { data, isLoading, isError } = useGetAllUsers({
    filterByAdmin: false,
  });

  const deleteUserMutation = useDeleteUser();

  //search query
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(data || []);

  useEffect(() => {
    if (data) {
      // Filter users based on search query
      const filtered = data.filter(
        (user: UserInputType) =>
          user.id.includes(searchQuery) ||
          user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, data]);

  //Delete User
  const handleDeleteUser = (userId: UserId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  //To get non Admin users
  useEffect(() => {
    if (!isLoading && !isError && data) {
      const nonAdminUsers = data.filter((user: UserInputType) => !user.isAdmin);
      if (nonAdminUsers.length > 0) {
        console.log("Non-admin users found");
        console.log(nonAdminUsers);
      } else {
        console.log("No non-admin users found");
      }
    }
  }, [data, isLoading, isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching users</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ID, name, or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <ul className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
        {filteredUsers.map((user) => (
          <li key={user.id} className="bg-white shadow-md rounded-lg p-4 ">
            <div className="flex flex-col space-y-2 gap-2 justify-start items-start">
              <span>
                <strong>Name:</strong> {user.firstname} {user.lastname}
              </span>
              <span>
                <strong>Email:</strong> {user.email}
              </span>
              <span>
                <strong>User ID: </strong>
                {user.id}
              </span>
              <span>
                <strong>Department: </strong>
                {user.department}
              </span>
            </div>
            {!user.isAdmin && (
              <div className="flex flex-row space-y-2 gap-2 justify-start items-center">
                <>
                  <PromoteUser userId={user.id} />
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="group inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 uppercase"
                  >
                    Delete User
                  </button>
                </>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
