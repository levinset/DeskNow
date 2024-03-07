import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeskFormData {
  label: string;
  type: string;
  column: number;
  row: number;
  equipment?: string[];
}

const createDesk = async (formData: DeskFormData) => {
  const adminToken = localStorage.getItem('accessToken');
  if (!adminToken) {
    throw new Error('No admin token found');
  }

  const response = await axios.post(
    'https://deskbooking.dev.webundsoehne.com/api/admin/desks',
    formData,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  return response.data;
};

export const useCreateDesk = () => {
  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: createDesk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['desks'] });
      alert('Desk created successfully!');
    },
  });

  return mutation;
};
