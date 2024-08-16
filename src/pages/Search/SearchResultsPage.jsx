import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import BookSearchForm from './searchComponents/BookSearchForm';
import SearchList from './searchComponents/SearchList';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import {
  useSearchBooksQuery,
  useSearchGoogleBooksQuery,
} from '../../store/api/apiSlice';
import {
  setDbSearchResults,
  setGoogleSearchResults,
  setIsSearching,
  setSearchError,
  setLastSearchParams,
  setSearchType,
  setSearchCriteria,
  clearSearch,
} from '../../store/slices/searchSlice';

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const {
    dbSearchResults,
    googleSearchResults,
    lastSearchParams,
    searchType,
    isSearching,
    error,
    searchCriteria,
  } = useSelector((state) => state.search);

  const {
    data: dbData,
    isFetching: dbIsFetching,
    isError: dbIsError,
    error: dbError,
  } = useSearchBooksQuery(lastSearchParams, {
    skip: !lastSearchParams || searchType !== 'db',
  });

  const {
    data: googleData,
    isFetching: googleIsFetching,
    isError: googleIsError,
    error: googleError,
  } = useSearchGoogleBooksQuery(lastSearchParams, {
    skip: !lastSearchParams || searchType !== 'google',
  });

  useEffect(() => {
    if (dbData) {
      dispatch(setDbSearchResults(dbData.data.books));
    }
  }, [dbData, dispatch]);

  useEffect(() => {
    if (googleData) {
      dispatch(setGoogleSearchResults(googleData.data.books));
    }
  }, [googleData, dispatch]);

  useEffect(() => {
    dispatch(setIsSearching(dbIsFetching || googleIsFetching));
  }, [dbIsFetching, googleIsFetching, dispatch]);

  useEffect(() => {
    if (dbIsError) {
      dispatch(
        setSearchError(
          dbError?.data?.message ||
            'An error occurred while searching the database'
        )
      );
    } else if (googleIsError) {
      dispatch(
        setSearchError(
          googleError?.data?.message ||
            'An error occurred while searching Google Books'
        )
      );
    }
  }, [dbIsError, googleIsError, dbError, googleError, dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(setSearchCriteria({ ...searchCriteria, [name]: value }));
  };

  const handleDbSearch = (newSearchParams) => {
    dispatch(setLastSearchParams(newSearchParams));
    dispatch(setSearchType('db'));
  };

  const handleGoogleSearch = (newSearchParams) => {
    dispatch(setLastSearchParams(newSearchParams));
    dispatch(setSearchType('google'));
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  const currentSearchResults =
    searchType === 'db' ? dbSearchResults : googleSearchResults;

  return (
    <Box>
      <BookSearchForm
        searchCriteria={searchCriteria}
        onInputChange={handleInputChange}
        onDbSearch={handleDbSearch}
        onGoogleSearch={handleGoogleSearch}
      />
      {isSearching && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!isSearching && !error && (
        <>
          {currentSearchResults.length > 0 ? (
            <>
              <SearchList
                books={currentSearchResults}
                title={`Search Results (${
                  searchType === 'db' ? 'Database' : 'Google Books'
                })`}
              />
              <Button
                onClick={handleClearSearch}
                variant="contained"
                color="secondary">
                Clear Search
              </Button>
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
