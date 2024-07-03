import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Grid, Typography } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';

import { fetchBooks } from '../../store/books/booksThunks';
import BookCard from './BookCard';

const BooksList = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <ErrorMessage message={error} />;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Books
      </Typography>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={4} md={3} lg={2.4} key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BooksList;

