import { useGetUserBookByIdQuery } from '../../../store/api/apiSlice';

export const useUserBookDetails = (ubid) => {
  const { data, isLoading, isError, error, refetch } = useGetUserBookByIdQuery(
    ubid,
    { skip: !ubid }
  );

  return {
    userBook: data?.data?.userBook || null,
    isLoading,
    isError,
    error,
    refetch,
  };
};
