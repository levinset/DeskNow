import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getAllBookedDesk = async (id: string) => {
  const url = `https://deskbooking.dev.webundsoehne.com/api/bookings/user/${id}`;
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

export function useGetAllBookedDesk(id: string) {
  return useQuery({
    queryKey: ["userBookeddesks", id],
    queryFn: () => getAllBookedDesk(id),
  });
}
