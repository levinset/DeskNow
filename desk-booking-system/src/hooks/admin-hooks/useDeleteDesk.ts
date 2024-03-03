import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteDesk = async (deskId: string) => {
  const adminToken = localStorage.getItem('accessToken');
  if (!adminToken) {
    throw new Error('No admin token found');
  }

  const response = await axios.delete(
    `https://deskbooking.dev.webundsoehne.com/api/admin/desks/${deskId}`,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  return response.data;
};

export const useDeleteDesk = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDesk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['desks'] });
      alert('Desk deleted successfully!');
    },
  });
};
