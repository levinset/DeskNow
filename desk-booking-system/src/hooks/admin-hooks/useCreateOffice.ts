import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface OfficeFormData {
  name: string;
  columns: number;
  rows: number;
}

const createOffice = async (formData: OfficeFormData) => {
  const adminToken = localStorage.getItem('accessToken');
  if (!adminToken) {
    throw new Error('No admin token found');
  }

  const response = await axios.post(
    'https://deskbooking.dev.webundsoehne.com/api/admin/offices',
    formData,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  return response.data;
};

export const useCreateOffice = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createOffice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offices'] });
      alert('Office created successfully!');
    },
  });

  return mutation;
};
