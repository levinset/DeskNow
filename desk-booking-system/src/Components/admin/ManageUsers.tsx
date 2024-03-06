import React, { useEffect } from "react";
import { useGetAllUsers } from "../../hooks/admin-hooks/useGetAllUsers";
import PromoteUser from "./PromoteUser";




const ManageUsers = () => {
 
  const { data, isLoading, isError } = useGetAllUsers({
    filterByAdmin: false,
    
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      // Filter out admin users
      const nonAdminUsers = data.filter((user) => !user.isAdmin);

      if (nonAdminUsers.length > 0) {
        // Perform actions for non-admin users
        console.log("Non-admin users found");
        console.log(nonAdminUsers);
      } else {
        // Perform actions when no non-admin users are found
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
      <ul className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
        {data.map((user) => (
          <li key={user.id} className="bg-white shadow-md rounded-lg p-4">
            <div>
              <span className="font-bold">{user.firstname} {user.lastname}</span> - {user.email}
            </div>
            {!user.isAdmin && (
              <PromoteUser userId={user.id} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
