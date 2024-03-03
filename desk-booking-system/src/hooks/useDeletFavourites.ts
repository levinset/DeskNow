import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteFavouritesDesk = async (deskId: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.delete(
      `https://deskbooking.dev.webundsoehne.com/api/favourites/${deskId}`,

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

export const useDeleteFavouritesDesk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavouritesDesk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deletfavourite"] });
    },
  });
};
