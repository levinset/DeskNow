import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getAllOffices = async () => {
  const url = 'https://deskbooking.dev.webundsoehne.com/api/offices';
  try {
    const adminToken = localStorage.getItem('accessToken');
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error getting offices');
  }
};

export const useGetAllOffices = () => {
  return useQuery({
    queryKey: ['offices'],
    queryFn: getAllOffices,
  });
};
