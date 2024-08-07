import { useGetBooksQuery } from '../../../store/api/apiSlice';

export const useBooks = () => {
  const { data, isLoading, isError, error } = useGetBooksQuery();
  return {
    books: data?.data?.books || [],
    isLoading,
    isError,
    error,
  };
};
