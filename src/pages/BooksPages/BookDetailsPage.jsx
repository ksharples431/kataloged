import { useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
} from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import BookDetailsCard from './bookComponents/BookDetailsCard';
import BookActions from './bookActions/BookActions';
import { useBookDetails } from './bookHooks/useBookDetails';
import { useBookActions } from './bookHooks/useBookActions';
import { useSnackbar } from '../../hooks/useSnackbar';

const BookDetailsPage = () => {
  const { bid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { book, isLoading, isError, error } = useBookDetails(bid);
  const {
    isDeleting,
    isUpdating,
    handleDeleteStart,
    handleUpdateStart,
    deleteBook,
  } = useBookActions();
  const { snackbar, showSnackbar, handleSnackbarClose } = useSnackbar();

  useEffect(() => {
    if (location.state?.snackbar) {
      showSnackbar(
        location.state.snackbar.message,
        location.state.snackbar.severity
      );
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, showSnackbar, navigate]);

  const handleBookAction = useCallback(
    async (success, message, action) => {
      if (action === 'delete') {
        handleDeleteStart();
        try {
          await deleteBook(bid).unwrap();
          navigate('/books', {
            state: {
              snackbar: {
                message: 'Book deleted successfully!',
                severity: 'success',
              },
            },
          });
        } catch (err) {
          showSnackbar(
            err.data?.message || 'Failed to delete book',
            'error'
          );
        }
      } else {
        showSnackbar(message, success ? 'success' : 'error');
      }
    },
    [bid, deleteBook, handleDeleteStart, navigate, showSnackbar]
  );

  if (isLoading) return <LoadingSpinner />;

  if (isError && !isDeleting && !isUpdating) {
    return (
      <ErrorMessage
        message={error?.data?.message || 'Failed to fetch book details'}
      />
    );
  }

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
      {book && !isDeleting && !isUpdating ? (
        <>
          <BookDetailsCard book={book} />
          <BookActions
            bid={book.bid}
            onBookAction={handleBookAction}
            onDeleteStart={handleDeleteStart}
            onUpdateStart={handleUpdateStart}
          />
        </>
      ) : isDeleting || isUpdating ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}>
          <CircularProgress />
          <Typography>
            {isDeleting ? 'Deleting' : 'Updating'} book...
          </Typography>
        </Box>
      ) : (
        <div>Book not found.</div>
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

export default BookDetailsPage;
