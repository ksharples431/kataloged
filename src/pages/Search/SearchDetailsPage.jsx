import { useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import SearchDetailsCard from './searchComponents/SearchDetailsCard';
import SearchActions from './searchActions/SearchActions';
import { useSearchDetails } from './searchHooks/useSearchDetails';
import { useSearchActions } from './searchHooks/useSearchActions';
import { useSnackbar } from '../../hooks/useSnackbar';

const SearchDetailsPage = () => {
  const { bid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { book, isLoading, isError, error } = useSearchDetails(bid);
  const { handleAddStart, addUserBook, addBook } = useSearchActions();
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
      if (action === 'add') {
        handleAddStart();
        try {
          const addBookResult = await addBook(book).unwrap();
          await addUserBook({
            bid: addBookResult.data.book.bid,
            uid: 'currentUserUid',
            kataloged: false,
          }).unwrap();
          showSnackbar('Book added successfully!', 'success');
        } catch (err) {
          showSnackbar(err.data?.message || 'Failed to add book', 'error');
        } finally {
          handleAddStart(false);
        }
      } else {
        showSnackbar(message, success ? 'success' : 'error');
      }
    },
    [book, addBook, addUserBook, handleAddStart, showSnackbar]
  );

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <ErrorMessage
        message={
          error?.data?.message ||
          'An error occurred while fetching the book details.'
        }
      />
    );
  }

  if (!book) {
    return <Typography variant="h6">Book not found.</Typography>;
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
      <SearchDetailsCard book={book} />
      <SearchActions
        bid={book.bid}
        onBookAction={handleBookAction}
        onAddStart={handleAddStart}
      />
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

export default SearchDetailsPage;
