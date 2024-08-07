import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import BookList from './userBookComponents/UserBookList';
import { useUserBooks } from './userBookHooks/useUserBooks';
import { useSnackbar } from '../../hooks/useSnackbar';

const UserBooksPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userBooks, isLoading, isError, error } = useUserBooks();
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
      {userBooks.length > 0 ? (
        <BookList userBooks={userBooks} />
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
