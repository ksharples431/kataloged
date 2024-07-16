import { useState, useEffect } from 'react';
import { useSearchBooksQuery } from '../../store/api/api.slice.js';
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

const BookSearchForm = ({
  onSearchResults,
  onSearchStart,
  onSearchError,
}) => {
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
      console.error('Please enter a title, author, or ISBN');
      return;
    }

    const searchParams = new URLSearchParams();
    if (title) searchParams.append('title', title.trim());
    if (author) searchParams.append('author', author.trim());
    if (isbn) searchParams.append('isbn', isbn.trim());

    setSearch(searchParams.toString());
    onSearchStart();
  };

  useEffect(() => {
    if (data && data.books) {
      onSearchResults(data.books);
    }
    if (isError) {
      onSearchError('An error occurred while searching');
    }
  }, [data, isError, onSearchResults, onSearchError]);

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
