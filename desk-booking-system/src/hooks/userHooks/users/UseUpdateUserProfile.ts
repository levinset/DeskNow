import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserInputType } from "../../../types/UserInputType";
interface UpdateUserProfileVariables {
  userId: string;
  data: UserInputType;
}

const updateUserProfile = async ({
  userId,
  data,
}: UpdateUserProfileVariables) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.put(
    `https://deskbooking.dev.webundsoehne.com/api/users/${userId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};
