import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import BookList from '../../components/BookList/BookList.jsx';
import BookSearchForm from './BookSearchForm.jsx';
import { setSearchResults } from '../../store/slices/search.slice';

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const {
    results: searchResults,
    isSearching,
    error: searchError,
  } = useSelector((state) => state.search);

  useEffect(() => {
    // If there are no results in Redux, check localStorage
    if (searchResults.length === 0) {
      const storedResults = JSON.parse(
        localStorage.getItem('lastSearchResults') || '[]'
      );
      if (storedResults.length > 0) {
        dispatch(setSearchResults(storedResults));
      }
    }
  }, [dispatch, searchResults.length]);

  return (
    <>
      <Box>
        <BookSearchForm />
      </Box>
      <Box>
        {isSearching && <Typography>Searching...</Typography>}
        {searchError && (
          <Typography color="error">{searchError}</Typography>
        )}
        {!isSearching && !searchError && (
          <>
            {searchResults.length > 0 ? (
              <BookList books={searchResults} type="search" />
            ) : (
              <Typography>No books found. Try another search.</Typography>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default SearchResultsPage;
