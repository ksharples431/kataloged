import { useGetAuthorsQuery } from '../../../store/api/apiSlice';

export const useAuthors = ({ sortBy = 'name', order = 'asc' } = {}) => {
  const { data, isLoading, isError, error } = useGetAuthorsQuery({
    sortBy,
    order,
  });

  return {
    authors: data?.data?.authors || [],
    isLoading,
    isError,
    error,
  };
};
