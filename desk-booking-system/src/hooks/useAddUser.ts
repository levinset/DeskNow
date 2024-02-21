import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserInputType } from "../types/UserInputType";

const addUsers = async (data: UserInputType) => {
  try {
    const response = await axios.post(
      "https://deskbooking.dev.webundsoehne.com/api/users/register",
      data
    );

    return response.data;
  } catch (error) {
    throw new Error("error fetching persons");
  }
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
