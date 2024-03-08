import React, { useState } from "react";
import axios from "axios";

interface UserProps {
  userId: string;
}

const PromoteUser: React.FC<UserProps> = ({ userId }) => {
  const adminToken = localStorage.getItem("accessToken"); // Retrieve access token from local storage

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPromoted, setIsPromoted] = useState(false);

  const handlePromoteUser = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await axios.put(
        `https://deskbooking.dev.webundsoehne.com/api/admin/promote`,
        { id: userId, isAdmin: true },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      console.log("User promoted successfully:", response.data);
      setIsPromoted(true); // Set promoted state to true
    } catch (error) {
      console.error("Error promoting user:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePromoteUser}
        disabled={isLoading}
        className="group inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 uppercase"
      >
        {isLoading ? "Promoting..." : "Promote User"}
      </button>
      {isError && <div>Error promoting user</div>}
      {isPromoted && <div>User promoted to admin successfully!</div>}{" "}
      {/* Display success message */}
    </div>
  );
};

export default PromoteUser;
