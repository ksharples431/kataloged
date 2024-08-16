import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import debounce from 'lodash/debounce';
import LiveSearchBar from './searchComponents/LiveSearchBar';
import BookList from '../BooksPages/bookComponents/BookList';
import UserBookList from '../UserBooksPages/userBookComponents/UserBookList';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import { useGeneralSearchBooksQuery } from '../../store/api/apiSlice';
import {
  setGeneralSearchResults,
  setUserSearchResults,
  setIsSearching,
  setSearchError,
  setLastSearchParams,
  setSearchType,
  clearSearch,
} from '../../store/slices/searchSlice';

const GeneralSearchResultsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    generalSearchResults,
    userSearchResults,
    isSearching,
    error,
    lastSearchParams,
  } = useSelector((state) => state.search);
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const uid = useSelector((state) => state.auth.user?.uid);


  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const searchParams = useMemo(() => {
    const params = { query: searchQuery };
    if (uid) params.uid = uid;
    return params;
  }, [searchQuery, uid]);

  const {
    data: searchData,
    isFetching,
    isError,
    error: searchError,
  } = useGeneralSearchBooksQuery(searchParams, {
    skip: !searchParams.query,
  });

  useEffect(() => {
    if (searchData) {
      dispatch(setGeneralSearchResults(searchData.allBooks || []));
      if (isAuthenticated) {
        dispatch(setUserSearchResults(searchData.userBooks || []));
      }
    }
    dispatch(setIsSearching(isFetching));
  }, [searchData, isFetching, dispatch, isAuthenticated]);

  useEffect(() => {
    if (isError) {
      console.error('Search error:', searchError);
      dispatch(
        setSearchError(
          searchError?.data?.message ||
            'An error occurred while performing the search'
        )
      );
    }
  }, [isError, searchError, dispatch]);

  useEffect(() => {
    if (initialQuery && initialQuery !== lastSearchParams?.query) {
      dispatch(setLastSearchParams({ query: initialQuery }));
      dispatch(setSearchType('general'));
    }
  }, [initialQuery, lastSearchParams, dispatch]);

  const debouncedSearch = useCallback(
    (query) => {
      const params = { query };
      if (uid) params.uid = uid;
      dispatch(setLastSearchParams(params));
      dispatch(setSearchType('general'));
      navigate(`/search?${new URLSearchParams(params).toString()}`, {
        replace: true,
      });
    },
    [dispatch, navigate, uid]
  );

  const debouncedSearchMemo = useMemo(
    () => debounce(debouncedSearch, 300),
    [debouncedSearch]
  );

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    debouncedSearchMemo(value);
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
    setSearchQuery('');
    navigate('/search');
  };

  return (
    <Box>
      <LiveSearchBar
        searchQuery={searchQuery}
        onInputChange={handleInputChange}
      />
      {isSearching && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!isSearching && !error && (
        <>
          {generalSearchResults.length > 0 && (
            <>
              {isAuthenticated && userSearchResults.length > 0 && (
                <UserBookList
                  userBooks={userSearchResults}
                  title="Your Books"
                />
              )}
              <BookList books={generalSearchResults} title="All Books" />
              <Button
                onClick={handleClearSearch}
                variant="contained"
                color="secondary"
                sx={{ mt: 2, ml: 2 }}>
                Clear Search
              </Button>
            </>
          )}
          {generalSearchResults.length === 0 &&
            lastSearchParams?.query && (
              <Typography sx={{ mt: 2, ml: 2 }}>
                No books found. Try another search.
              </Typography>
            )}
        </>
      )}
    </Box>
  );
};

export default GeneralSearchResultsPage;