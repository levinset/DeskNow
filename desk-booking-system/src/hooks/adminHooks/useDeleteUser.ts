import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteUser = async (userId: string) => {
  const adminToken = localStorage.getItem('accessToken');
  if (!adminToken) {
    throw new Error('No admin token found');
  }

  const response = await axios.delete(
    `https://deskbooking.dev.webundsoehne.com/api/admin/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  return response.data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate the users query to refetch the updated user list
      queryClient.invalidateQueries({ queryKey: ['users'] });
      alert('User deleted successfully!');
    },
  });
};
