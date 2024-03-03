import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
//types
interface AddDeskPayload {
  desk: string;
}

//
const fixRequest = async (data: AddDeskPayload) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await axios.post(
    "https://deskbooking.dev.webundsoehne.com/api/fixdesk-requests",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const useFixRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fixRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fixdeskrequest"] });
    },
  });
};
