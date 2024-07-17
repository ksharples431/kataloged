import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import BookList from '../../components/BookList/BookList.jsx';
import BookSearchForm from './BookSearchForm.jsx';

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setIsSearching(false);
    setSearchError(null);
    localStorage.setItem('lastSearchResults', JSON.stringify(results));
  };

  const handleSearchStart = () => {
    setIsSearching(true);
    setSearchError(null);
  };

  const handleSearchError = (error) => {
    setIsSearching(false);
    setSearchError(error);
  };

  return (
    <>
      <Box>
        <BookSearchForm
          onSearchResults={handleSearchResults}
          onSearchStart={handleSearchStart}
          onSearchError={handleSearchError}
        />
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
