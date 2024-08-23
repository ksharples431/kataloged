import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import UserBookList from './userBookComponents/UserBookList';
import { useUserBooks } from './userBookHooks/useUserBooks';
import { useSnackbar } from '../../hooks/useSnackbar';
import SortOption from '../../components/UI/SortOption';

const UserBooksPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState('title');
  const [order, setOrder] = useState('asc');

  const { userBooks, isLoading, isError, error } = useUserBooks({
    sortBy,
    order,
  });

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
      setOrder(newSortBy === 'updatedAt' ? 'desc' : 'asc');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <ErrorMessage
        message={error?.data?.message || "Failed to fetch user's books"}
      />
    );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        My Books
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
      {userBooks.length > 0 ? (
        <UserBookList userBooks={userBooks} />
      ) : (
        <Typography>You haven&apos;t added any books yet.</Typography>
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

export default UserBooksPage;
