import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import SearchDetailsCard from './searchComponents/SearchDetailsCard';
import SearchActions from './searchActions/SearchActions';
import { useSearchDetails } from './searchHooks/useSearchDetails';
import { useSearchActions } from './searchHooks/useSearchActions';
import { useSnackbar } from '../../hooks/useSnackbar';

const SearchDetailsPage = () => {
  const { bid } = useParams();
  const { book, isLoading, isError, error } = useSearchDetails(bid);
  const { handleAddStart, addUserBook, addBook } =
    useSearchActions();
  const { snackbar, showSnackbar, handleSnackbarClose } = useSnackbar();

  const handleBookAction = async (success, message, action) => {
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
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">{error}</Typography>;
  if (!book) return <Typography>Book not found</Typography>;

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
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
