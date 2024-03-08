import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface FixDeskRequestFormData {
  id: string;
  status: string;
}

const updateFixDeskRequest = async (requestData: FixDeskRequestFormData) => {
    const adminToken = localStorage.getItem('accessToken');
    if (!adminToken) {
      throw new Error('No admin token found');
    }
  
    const response = await axios.put(
      `https://deskbooking.dev.webundsoehne.com/api/admin/fix-desk-requests`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
  
    return response.data;
  };
  
  export const useUpdateFixDeskRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: updateFixDeskRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['fixDeskRequests'] });
        alert('Fix desk request updated successfully!');
      },
    });
  };
