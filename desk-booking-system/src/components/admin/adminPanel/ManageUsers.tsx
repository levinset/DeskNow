import React, { useEffect, useState } from "react";
import { useGetAllUsers } from "../../../hooks/adminHooks/useGetAllUsers";
import PromoteUser from "./PromoteUser";
import { useDeleteUser } from "../../../hooks/adminHooks/useDeleteUser";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: boolean;
}

const ManageUsers: React.FC = () => {
  const { data, isLoading, isError } = useGetAllUsers({
    filterByAdmin: false,
  });

  const deleteUserMutation = useDeleteUser();

  // Search query
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    if (data) {
      // Filter users based on search query
      const filtered = data.filter(
        (user: User) =>
          user.id.includes(searchQuery) ||
          user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, data]);

  // Delete User
  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching users</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Manage Users</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      <ul className="grid grid-cols-1 gap-4 overflow-y-auto max-h-96">
        {filteredUsers.map((user: User) => (
          <li key={user.id} className="p-4 bg-white rounded-lg shadow-md">
            <div>
              <span className="font-bold">
                {user.firstname} {user.lastname}
              </span>{" "}
              - {user.email}
            </div>
            {!user.isAdmin && <PromoteUser userId={user.id} />}
            <button
              className="px-2 mt-2 bg-red-400 rounded-lg"
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
