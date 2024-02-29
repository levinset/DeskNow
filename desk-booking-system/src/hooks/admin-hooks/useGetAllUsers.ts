import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface GetAllUsersVariables {
  filterByAdmin: boolean;
  token: string
}

const getAllUsers = async ({ filterByAdmin, token }: GetAllUsersVariables & { token: string }) => {
  const url = "https://deskbooking.dev.webundsoehne.com/api/users"; 
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { isAdmin: filterByAdmin }, 
    });
    return response.data;
  } catch (error) {
    throw new Error("Error getting users");
  }
};

export function useGetAllUsers({ filterByAdmin }: GetAllUsersVariables) {
  const token = localStorage.getItem("accessToken") || ""; 
  return useQuery({
    queryKey: ["users", filterByAdmin],
    queryFn: () => getAllUsers({ filterByAdmin, token }),
  });
}
