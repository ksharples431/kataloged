import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import BookSearchForm from './searchComponents/BookSearchForm';
import SearchList from './searchComponents/SearchList';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import { useSearchBooksQuery } from '../../store/api/apiSlice';
import {
  setSearchResults,
  setIsSearching,
  setSearchError,
  setLastSearchParams,
  clearSearch,
} from '../../store/slices/searchSlice';

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const { searchResults, lastSearchParams, isSearching, error } =
    useSelector((state) => state.search);

  const { data, isLoading, isError } = useSearchBooksQuery(
    lastSearchParams,
    {
      skip: !lastSearchParams,
    }
  );

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setSearchResults(data.data.books));
    }
  }, [data, isLoading, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(
        setSearchError(
          error?.message || 'An error occurred while searching'
        )
      );
    }
    dispatch(setIsSearching(false));
  }, [isError, error, dispatch]);

  const handleSearch = (newSearchParams) => {
    if (newSearchParams !== lastSearchParams) {
      dispatch(setIsSearching(true));
      dispatch(setLastSearchParams(newSearchParams));
    }
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  return (
    <Box>
      <BookSearchForm onSearch={handleSearch} />
      {isSearching && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!isSearching && !error && (
        <>
          {searchResults.length > 0 ? (
            <>
              <SearchList books={searchResults} title="Search Results" />
              <Button onClick={handleClearSearch}>Clear Search</Button>
            </>
          ) : (
            <Typography>No books found. Try another search.</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchResultsPage;
