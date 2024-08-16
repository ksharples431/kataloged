import { useSelector } from 'react-redux';
import { useGetBookByIdQuery } from '../../../store/api/apiSlice';

export const useSearchDetails = (bid) => {
  const { dbSearchResults, googleSearchResults } = useSelector(
    (state) => state.search
  );
  const allSearchResults = [...dbSearchResults, ...googleSearchResults];

  const bookFromResults = allSearchResults.find((b) => b.bid === bid);

  const {
    data: bookFromApi,
    isLoading,
    isError,
    error,
  } = useGetBookByIdQuery(bid, {
    skip: !!bookFromResults,
  });

  return {
    book: bookFromResults || bookFromApi?.data?.book,
    isLoading,
    isError,
    error: error?.data?.message || error?.error,
  };
};
