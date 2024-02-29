import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getComments = async (page) => {
  const url = 'https://deskbooking.dev.webundsoehne.com/api/comments';
  try {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
      },
    };
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    throw new Error('Error getting comments');
  }
};

export const useGetComments = (page) => {
  return useQuery({
    queryKey: ['comments', page],
    queryFn: () => getComments(page),
  });
};
