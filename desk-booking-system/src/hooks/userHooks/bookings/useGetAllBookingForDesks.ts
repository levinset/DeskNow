import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getAllBookingForDesks = async (ids: string[]) => {
  try {
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Fetch bookings for each desk ID
    const promises = ids.map(async (id) => {
      const url = `https://deskbooking.dev.webundsoehne.com/api/bookings/desk/${id}`;
      const response = await axios.get(url, config);
      return response.data;
    });

    // Wait for all promises to resolve
    const results = await Promise.all(promises);

    // Combine the results
    const allBookings = results.flatMap((booking) => booking);

    return allBookings;
  } catch (error) {
    throw new Error("Error getting user profile");
  }
};

export function useGetAllBookingForDesks(ids: string[]) {
  return useQuery({
    queryKey: ["userFavouriteDesks", ids], // Assuming this should be "userFavouriteDesks" instead of "userFavouritsDesks"
    queryFn: () => getAllBookingForDesks(ids),
  });
}
