import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getAllFavouritesDesk = async (id: string) => {
  const url = `https://deskbooking.dev.webundsoehne.com/api/favourites/user/${id}`;
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

export function useGetAllFavouritesDesk(id: string) {
  return useQuery({
    queryKey: ["userFavouritsDesks", id],
    queryFn: () => getAllFavouritesDesk(id),
  });
}
