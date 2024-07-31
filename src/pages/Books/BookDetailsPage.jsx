import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
} from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import BookDetailsCard from '../../components/BookDetails/BookDetailsCard.jsx';
import BookActions from '../../components/Actions/BookActions.jsx';
import { useGetBookByIdQuery } from '../../store/api/apiSlice.js';

const BookDetailsPage = () => {
  const { bid } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetBookByIdQuery(bid, {
    skip: !bid,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) {
      const timer = setTimeout(() => {
        navigate('/books');
      }, 3000); // Navigate after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isDeleting, navigate]);

  const handleBookDeleted = (success, message) => {
    setSnackbar({
      open: true,
      message: message,
      severity: success ? 'success' : 'error',
    });
    if (success) {
      setIsDeleting(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && !isDeleting) {
    return (
      <ErrorMessage
        message={error?.data?.message || 'Failed to fetch book details'}
      />
    );
  }

  const book = data?.items?.[0];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        maxWidth: 800,
        margin: 'auto',
        padding: 2,
      }}>
      {book && !isDeleting ? (
        <>
          <BookDetailsCard book={book} type={data.type} />
          <BookActions
            bid={book.id}
            book={book}
            onBookDeleted={handleBookDeleted}
          />
        </>
      ) : isDeleting ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}>
          <CircularProgress />
          <Typography>Deleting book...</Typography>
        </Box>
      ) : (
        <div>Book not found.</div>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
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

export default BookDetailsPage;
