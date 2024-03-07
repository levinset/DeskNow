// import libraries
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
//tupes
interface CreateFavouriteData {
  desk: string;
}

const creatFavourite = async (data: CreateFavouriteData) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }

    const response = await axios.post(
      "https://deskbooking.dev.webundsoehne.com/api/favourites",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Error creating favourite");
  }
};

export const useCreatFavourite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: creatFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createfavourite"] });
    },
  });
};
