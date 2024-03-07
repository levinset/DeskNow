import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const tokenRefresh = async () => {
  const url = "https://deskbooking.dev.webundsoehne.com/api/users/refresh";
  const tokenOld = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${tokenOld}`,
    },
  };
  const refreshToken = localStorage.getItem("refreshToken"); // Get the refresh token
  const requestBody = { refresh: refreshToken }; // Construct the request body

  const response = await axios.post(url, requestBody, config);

  // Assuming the response structure is as follows:
  const { token, refresh } = response.data;

  // Save token and refresh token to localStorage
  localStorage.setItem("accessToken", token);
  localStorage.setItem("refreshToken", refresh);

  return response.data;
};

export const useTokenRefresh = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: tokenRefresh,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refreshtoken"] });
    },
  });
};
