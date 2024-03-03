import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
//
interface CommentData {
  comment: string;
  desk: string;
}

//
const sendComment = async (data: CommentData) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await axios.post(
    "https://deskbooking.dev.webundsoehne.com/api/comments",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const useSendComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sendcomment"] });
    },
  });
};
