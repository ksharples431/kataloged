import PropTypes from 'prop-types';
import { useState } from 'react';
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

const BookSearchForm = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    title: '',
    author: '',
    isbn: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, author, isbn } = searchCriteria;

    if (!title && !author && !isbn) {
      // You might want to show an error message to the user here
      return;
    }

    const searchParams = new URLSearchParams();
    if (title) searchParams.append('title', title.trim());
    if (author) searchParams.append('author', author.trim());
    if (isbn) searchParams.append('isbn', isbn.trim());

    onSearch(searchParams.toString());
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography component="h2" variant="h4" gutterBottom>
            Search for a Book
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
              sx={{ mt: 2 }}>
              Search
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

BookSearchForm.propTypes = {
  onSearch: PropTypes.func
};

export default BookSearchForm;
