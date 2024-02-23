//
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

//
const getAllDepartments = async () => {
  const url = "https://deskbooking.dev.webundsoehne.com/api/departments";

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Error getting Departments");
  }
};

export function useGetAllDepartments() {
  return useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
  });
}
