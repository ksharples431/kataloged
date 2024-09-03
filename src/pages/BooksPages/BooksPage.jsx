import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import BookList from './bookComponents/BookList';
import { useBooks } from './bookHooks/useBooks';
import { useSnackbar } from '../../hooks/useSnackbar';
import SortOption from '../../components/UI/SortOption';
// import useErrorManager from '../../hooks/useErrorManager';

const BooksPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState('title');
  const [order, setOrder] = useState('asc');

  const { books, isLoading } = useBooks({ sortBy, order });
  const { snackbar, showSnackbar, handleSnackbarClose } = useSnackbar();
  // const { handleError } = useErrorManager();

  useEffect(() => {
    if (location.state?.snackbar) {
      showSnackbar(
        location.state.snackbar.message,
        location.state.snackbar.severity
      );
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate, showSnackbar]);

  const handleSort = (newSortBy) => {
    if (newSortBy === sortBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setOrder(newSortBy === 'updatedAt' ? 'desc' : 'asc');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Public Library
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 3,
          mb: 1,
          pb: 1,
          mr: 3,
          ml: 3,
        }}>
        <SortOption
          label="Title"
          sortKey="title"
          currentSortBy={sortBy}
          currentOrder={order}
          onSort={handleSort}
        />
        <SortOption
          label="Author"
          sortKey="author"
          currentSortBy={sortBy}
          currentOrder={order}
          onSort={handleSort}
        />
        <SortOption
          label="Recent"
          sortKey="updatedAt"
          currentSortBy={sortBy}
          currentOrder={order}
          onSort={handleSort}
        />
      </Box>
      {books && books.length > 0 ? (
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
