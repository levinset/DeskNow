import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
//types
interface AddDeskPayload {
  dateStart: string;
  dateEnd: string;
  desk: string;
}

//
const addDesk = async (data: AddDeskPayload) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await axios.post(
    "https://deskbooking.dev.webundsoehne.com/api/bookings",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const useAddDesk = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDesk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookedDesk"] });
    },
  });
};
