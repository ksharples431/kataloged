import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
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
} from '../../store/slices/searchSlice';

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const { searchResults, lastSearchParams } = useSelector(
    (state) => state.search
  );
  const [searchParams, setSearchParams] = useState(lastSearchParams || '');

  const { data, isLoading, isError, error } = useSearchBooksQuery(
    searchParams,
    {
      skip: !searchParams,
    }
  );

  useEffect(() => {
    if (data) {
      dispatch(setSearchResults(data.data.books));
    }
  }, [data, dispatch]);

  const handleSearch = (newSearchParams) => {
    if (newSearchParams !== searchParams) {
      setSearchParams(newSearchParams);
      dispatch(setIsSearching(true));
      dispatch(setLastSearchParams(newSearchParams));
    }
  };

  useEffect(() => {
    if (isError) {
      dispatch(
        setSearchError(
          error.message || 'An error occurred while searching'
        )
      );
    }
    dispatch(setIsSearching(false));
  }, [isError, error, dispatch]);

  return (
    <Box>
      <BookSearchForm onSearch={handleSearch} />
      {isLoading && <LoadingSpinner />}
      {isError && (
        <ErrorMessage
          message={
            error?.data?.message || 'An error occurred while searching'
          }
        />
      )}
      {!isLoading && !isError && (
        <>
          {searchResults.length > 0 ? (
            <SearchList books={searchResults} title="Search Results" />
          ) : (
            <Typography>No books found. Try another search.</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchResultsPage;
