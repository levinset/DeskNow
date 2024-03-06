import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type PageType = number;

const getComments = async (page: PageType) => {
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

export const useGetComments = (page: PageType) => {
  return useQuery({
    queryKey: ['comments', page],
    queryFn: () => getComments(page),
  });
};
