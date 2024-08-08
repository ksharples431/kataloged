import { useGetBookByIdQuery } from '../../../store/api/apiSlice';

export const useBookDetails = (bid) => {
  const { data, isLoading, isError, error } = useGetBookByIdQuery(bid, {
    skip: !bid 
  });

  return {
    book: data?.data?.book || null,
    isLoading,
    isError,
    error,
  };
};
