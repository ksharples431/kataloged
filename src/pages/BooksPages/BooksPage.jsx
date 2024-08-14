import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import BookList from './bookComponents/BookList';
import { useBooks } from './bookHooks/useBooks';
import { useSnackbar } from '../../hooks/useSnackbar';

const BooksPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('title');
  const [order, setOrder] = useState('asc');
  const { books, isLoading, isError, error } = useBooks({ sortBy, order });
  const { snackbar, showSnackbar, handleSnackbarClose } = useSnackbar();

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
      setOrder('asc');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <ErrorMessage
        message={error?.data?.message || 'Failed to fetch books'}
      />
    );

  const SortOption = ({ label, sortKey }) => (
    <Box sx={{ position: 'relative', cursor: 'pointer' }}>
      <Typography
        onClick={() => handleSort(sortKey)}
        sx={{
          fontWeight: sortBy === sortKey ? 'bold' : 'normal',
          color: sortBy === sortKey ? 'primary.main' : 'text.primary',
          '&:hover': { color: 'primary.main' },
        }}>
        {label}
        {sortBy === sortKey && (order === 'asc' ? ' ↑' : ' ↓')}
      </Typography>
      {sortBy === sortKey && (
        <Box
          sx={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            width: '100%',
            height: 2,
            backgroundColor: 'primary.main',
          }}
        />
      )}
    </Box>
  );

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
        <SortOption label="Title" sortKey="title" />
        <SortOption label="Author" sortKey="author" />
        <SortOption label="Recent" sortKey="updatedAt" />
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
