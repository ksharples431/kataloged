import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import BookList from './components/BookList';
import { useBooks } from '../../hooks/useBooks';

const BooksPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { books, isLoading, isError, error } = useBooks();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbar(location.state.snackbar);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <ErrorMessage
        message={error?.data?.message || 'Failed to fetch books'}
      />
    );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Public Library
      </Typography>
      {books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <Typography>No books available.</Typography>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BooksPage;
