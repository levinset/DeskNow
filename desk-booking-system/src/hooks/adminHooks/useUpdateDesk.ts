import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeskFormData {
    id: string;
    label: string;
    equipment?: string[];
    officeId: string;
  }

  const updateDesk = async (data: DeskFormData) => {
    const { id, ...formData } = data; // Extract desk ID from data
    const adminToken = localStorage.getItem('accessToken');
    if (!adminToken) {
      throw new Error('No admin token found');
    }
  
    const response = await axios.put(
      `https://deskbooking.dev.webundsoehne.com/api/admin/desks/${id}`, // Include desk ID in the URL
      formData, // Send only the desk data without the ID
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
  
    return response.data;
  };
  

export const useUpdateDesk = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDesk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['desks'] });
      alert('Desk updated successfully!');
    },
  });
};
