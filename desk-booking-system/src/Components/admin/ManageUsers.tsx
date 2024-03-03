import React, { useEffect } from "react";
import { useGetAllUsers } from "../../hooks/admin-hooks/useGetAllUsers";
import PromoteUser from "./PromoteUser";





const ManageUsers = () => {
  //Admin token stored somewhere
  const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjllMDc3YjU2LWY5ZGYtNDI5OS05Y2IzLTA3ZDUwZjljYTIzOCIsImZpcnN0bmFtZSI6IkFkbWluIiwibGFzdG5hbWUiOiIwMSIsImVtYWlsIjoiYWRtaW4xQGNzYXcuYXQiLCJpc0FkbWluIjp0cnVlLCJkZXBhcnRtZW50IjoiQ29kaW5nU2Nob29sIiwiY3JlYXRlZEF0IjoiMjAyNC0wMi0yMlQwOTo1MDo1OC43MDNaIiwidXBkYXRlZEF0IjoiMjAyNC0wMi0yN1QxNDo0MDowNC4zNzVaIiwiaWF0IjoxNzA5MDQ5Mzk5LCJleHAiOjE3MDkxMzU3OTl9.XBSze0Qibuh_pqlJNMncI8XPsUyqv-MP7ithqVJ2jYY";

  const { data, isLoading, isError } = useGetAllUsers({
    filterByAdmin: false,
    token: adminToken,
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
              <PromoteUser userId={user.id} adminToken={adminToken} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
