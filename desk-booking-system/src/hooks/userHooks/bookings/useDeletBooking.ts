import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteBooking = async (bookedId: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.delete(
      `https://deskbooking.dev.webundsoehne.com/api/bookings/${bookedId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Error updating user profile");
  }
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deletbooking"] });
    },
  });
};
