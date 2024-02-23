import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getUserProfile = async () => {
  const url = "https://deskbooking.dev.webundsoehne.com/api/users/profile";
  try {
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    throw new Error("Error getting user profile");
  }
};

export function useGetUserProfile() {
  return useQuery({
    queryKey: ["userprofile"],
    queryFn: getUserProfile,
  });
}
