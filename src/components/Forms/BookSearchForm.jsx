import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchBooksQuery } from '../../store/api/apiSlice';
import {
  setSearchResults,
  setIsSearching,
  setSearchError,
  clearSearchResults,
} from '../../store/slices/searchSlice';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';

const BookSearchForm = () => {
  const dispatch = useDispatch();
  const [searchCriteria, setSearchCriteria] = useState({
    title: '',
    author: '',
    isbn: '',
  });
  const [search, setSearch] = useState('');
  const { data, isLoading, isError } = useSearchBooksQuery(search, {
    skip: !search,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const { title, author, isbn } = searchCriteria;

    if (!title && !author && !isbn) {
      dispatch(setSearchError('Please enter a title, author, or ISBN'));
      return;
    }

    const searchParams = new URLSearchParams();
    if (title) searchParams.append('title', title.trim());
    if (author) searchParams.append('author', author.trim());
    if (isbn) searchParams.append('isbn', isbn.trim());

    setSearch(searchParams.toString());
    dispatch(setIsSearching(true));
    dispatch(clearSearchResults()); // Clear previous results
  };

  useEffect(() => {
    if (data) {
      dispatch(
        setSearchResults({
          transformed: data.transformed.items,
          original: data.original,
        })
      );
    }
    dispatch(setIsSearching(isLoading));
    if (isError) {
      dispatch(setSearchError('An error occurred while searching'));
    } else {
      dispatch(setSearchError(null));
    }
  }, [data, isLoading, isError, dispatch]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography component="h2" variant="h4" gutterBottom>
            Search for a Book
          </Typography>
          <Box component="form" onSubmit={handleSearch} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={searchCriteria.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="author"
                  label="Author"
                  variant="outlined"
                  fullWidth
                  value={searchCriteria.author}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="isbn"
                  label="ISBN"
                  variant="outlined"
                  fullWidth
                  value={searchCriteria.isbn}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{ mt: 2 }}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookSearchForm;
