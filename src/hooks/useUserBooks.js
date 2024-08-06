import { useSelector } from 'react-redux';
import { useGetUserBooksQuery } from '../store/api/apiSlice';

export const useUserBooks = () => {
  const uid = useSelector((state) => state.auth.user?.uid);
  const { data, isLoading, isError, error } = useGetUserBooksQuery(
    { uid },
    { skip: !uid }
  );
  return { userBooks: data?.items, isLoading, isError, error };
};
