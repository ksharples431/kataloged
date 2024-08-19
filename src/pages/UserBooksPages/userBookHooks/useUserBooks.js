import { useSelector } from 'react-redux';
import { useGetUserBooksQuery } from '../../../store/api/apiSlice';

export const useUserBooks = ({ sortBy = 'title', order = 'asc' } = {}) => {
  const uid = useSelector((state) => state.auth.user?.uid);
  const { data, isLoading, isError, error } = useGetUserBooksQuery(
    { uid, sortBy, order },
    { skip: !uid }
  );

  return {
    userBooks: data?.data?.userBooks || [],
    isLoading,
    isError,
    error,
  };
};
