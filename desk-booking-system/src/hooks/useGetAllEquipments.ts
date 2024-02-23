//
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

//
const getAllEquipment = async () => {
  const url = "https://deskbooking.dev.webundsoehne.com/api/equipments";

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Error getting Equipments");
  }
};

export function useGetAllEquipment() {
  return useQuery({
    queryKey: ["equipments"],
    queryFn: getAllEquipment,
  });
}
