import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getAllFixDeskRequests = async () => {
  const url =
    "https://deskbooking.dev.webundsoehne.com/api/admin/fix-desk-requests";
  try {
    const adminToken = localStorage.getItem("accessToken");
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${adminToken}`, // Fallback to adminToken if accessToken is not available
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching FixDesk requests");
  }
};

export function useGetAllFixDesk() {
  return useQuery({
    queryKey: ["fixDeskRequests"],
    queryFn: getAllFixDeskRequests,
  });
}
