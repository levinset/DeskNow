import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateUserProfile = async ({ userId, data }) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.put(
      `https://deskbooking.dev.webundsoehne.com/api/users/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Error updating user profile');
  }
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userprofile"] });
    },
  });
};
