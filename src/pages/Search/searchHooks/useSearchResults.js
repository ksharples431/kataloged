import { useSelector, useDispatch } from 'react-redux';
import { useSearchBooksQuery } from '../../../store/api/apiSlice';
import {
  setSearchResults,
  setIsSearching,
  setSearchError,
} from '../../../store/slices/searchSlice';

export const useSearchResults = (searchParams) => {
  const dispatch = useDispatch();
  const { searchResults, isSearching, error } = useSelector(
    (state) => state.search
  );

  const { refetch } = useSearchBooksQuery(searchParams, { skip: true });

  const performSearch = async () => {
    if (!searchParams) return;

    dispatch(setIsSearching(true));
    try {
      const { data } = await refetch();
      dispatch(setSearchResults(data.data.books));
    } catch (err) {
      dispatch(
        setSearchError(err.message || 'An error occurred while searching')
      );
    }
  };

  return {
    searchResults,
    isLoading: isSearching,
    isError: !!error,
    error,
    performSearch,
  };
};
