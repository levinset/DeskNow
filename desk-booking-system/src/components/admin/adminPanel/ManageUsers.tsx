import React, { useEffect } from "react";
import { useGetAllUsers } from "../../../hooks/adminHooks/useGetAllUsers";
import PromoteUser from "./PromoteUser";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: boolean;
}

const ManageUsers: React.FC = () => {
  // Admin token stored somewhere
  const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjllMDc3YjU2LWY5ZGYtNDI5OS05Y2IzLTA3ZDUwZjljYTIzOCIsImZpcnN0bmFtZSI6IkFkbWluIiwibGFzdG5hbWUiOiIwMSIsImVtYWlsIjoiYWRtaW4xQGNzYXcuYXQiLCJpc0FkbWluIjp0cnVlLCJkZXBhcnRtZW50IjoiQ29kaW5nU2Nob29sIiwiY3JlYXRlZEF0IjoiMjAyNC0wMi0yMlQwOTo1MDo1OC43MDNaIiwidXBkYXRlZEF0IjoiMjAyNC0wMi0yN1QxNDo0MDowNC4zNzVaIiwiaWF0IjoxNzA5MDQ5Mzk5LCJleHAiOjE3MDkxMzU3OTl9.XBSze0Qibuh_pqlJNMncI8XPsUyqv-MP7ithqVJ2jYY";

  const { data, isLoading, isError } = useGetAllUsers({
    filterByAdmin: false,
    token: adminToken,
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      // Filter out admin users
      const nonAdminUsers = data.filter((user: User) => !user.isAdmin);

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
      <h1 className="mb-4 text-3xl font-bold">Manage Users</h1>
      <ul className="grid grid-cols-1 gap-4 overflow-y-auto max-h-96">
        {data.map((user: User) => (
          <li key={user.id} className="p-4 bg-white rounded-lg shadow-md">
            <div>
              <span className="font-bold">
                {user.firstname} {user.lastname}
              </span>{" "}
              - {user.email}
            </div>
            {!user.isAdmin && <PromoteUser userId={user.id} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
