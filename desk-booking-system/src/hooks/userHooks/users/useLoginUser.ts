import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserLoginType } from "../../../types/UserLoginType";

const loginUsers = async (data: UserLoginType) => {
  try {
    const response = await axios.post(
      "https://deskbooking.dev.webundsoehne.com/api/users/login",
      data
    );
    //
    const { token, refresh } = response.data;
    // Save token and refresh token to localStorage
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refresh);
    return response.data;
  } catch (error) {
    throw new Error("error fetching persons");
  }
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loginusers"] });
    },
  });
};
