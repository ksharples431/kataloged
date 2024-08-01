import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import GenericList from '../../components/GenericList/GenericList.jsx';
import BookSearchForm from '../../components/Forms/BookSearchForm.jsx';

const SearchResultsPage = () => {
  const {
    transformedResults: searchResults,
    isSearching,
    error: searchError,
  } = useSelector((state) => state.search);

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
              <GenericList
                items={searchResults}
                type="search"
                title="Search Results"
              />
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
