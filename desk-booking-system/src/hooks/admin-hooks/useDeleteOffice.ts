import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteOffice = async (officeId: string) => {
  const adminToken = localStorage.getItem('accessToken');
  if (!adminToken) {
    throw new Error('No admin token found');
  }

  const response = await axios.delete(
    `https://deskbooking.dev.webundsoehne.com/api/admin/offices/${officeId}`,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  return response.data;
};

export const useDeleteOffice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOffice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offices'] });
      alert('Office deleted successfully!');
    },
  });
};
