import { useSelector } from 'react-redux';

export const useSearchDetails = (bid) => {
  const searchResults = useSelector((state) => state.search.searchResults);

  const book = searchResults.find((b) => b.bid === bid);

  return {
    book: book || null,
    isLoading: false,
    isError: !book,
    error: !book ? 'Book not found' : null,
  };
};
