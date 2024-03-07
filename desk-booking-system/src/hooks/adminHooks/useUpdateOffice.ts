import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface OfficeUpdateData {
  id: string;
  name: string;
  columns: number;
  rows: number;
}

const updateOffice = async (data: OfficeUpdateData) => {
  const adminToken = localStorage.getItem('accessToken');
  if (!adminToken) {
    throw new Error('No admin token found');
  }

  const response = await axios.put(
    `https://deskbooking.dev.webundsoehne.com/api/admin/offices/${data.id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  return response.data;
};

export const useUpdateOffice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOffice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offices'] });
      alert('Office updated successfully!');
    },
  });
};
