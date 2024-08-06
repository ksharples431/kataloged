import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Box,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
} from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import BookDetailsCard from './components/BookDetailsCard';
import BookActions from '../../components/Actions/BookActions';
import { useBookDetails } from '../../hooks/useBookDetails';
import { useBookActions } from '../../hooks/useBookActions';
import { useSnackbar } from '../../hooks/useSnackbar';

const BookDetailsPage = () => {
  const { bid } = useParams();
  const location = useLocation();
  const { book, isLoading, isError, error } = useBookDetails(bid);
  const {
    isDeleting,
    isUpdating,
    handleDeleteStart,
    handleUpdateStart,
    handleBookAction,
  } = useBookActions();
  const { snackbar, showSnackbar, handleSnackbarClose } = useSnackbar();

  useEffect(() => {
    if (location.state?.snackbar) {
      showSnackbar(
        location.state.snackbar.message,
        location.state.snackbar.severity
      );
      window.history.replaceState({}, document.title);
    }
  }, [location, showSnackbar]);

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
            book={book}
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
