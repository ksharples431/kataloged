import { useGetBooksQuery } from '../../../store/api/apiSlice';

export const useBooks = ({ sortBy = 'title', order = 'asc' } = {}) => {
  const { data, isLoading, isError, error } = useGetBooksQuery({
    sortBy,
    order,
  });

  return {
    books: data?.data?.books || [],
    isLoading,
    isError,
    error,
  };
};
