import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
} from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import BookDetailsCard from '../../components/BookDetails/BookDetailsCard';
import UserBookActions from '../../components/Actions/UserBookActions';
import { useGetUserBookByIdQuery } from '../../store/api/apiSlice';

const UserBookDetailsPage = () => {
  const { ubid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const { data, isLoading, isError, error, refetch } =
    useGetUserBookByIdQuery(ubid, {
      skip: !ubid,
    });

  useEffect(() => {
    refetch();
  }, [refetch, ubid]);

  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbar(location.state.snackbar);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleDeleteStart = () => setIsDeleting(true);
  const handleUpdateStart = () => setIsUpdating(true);

  const handleUserBookAction = (success, message, action) => {
    if (success && action === 'delete') {
      navigate('/my-books', {
        state: {
          snackbar: {
            open: true,
            message,
            severity: 'success',
          },
        },
      });
    } else {
      setSnackbar({
        open: true,
        message,
        severity: success ? 'success' : 'error',
      });
    }
    setIsDeleting(false);
    setIsUpdating(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError && !isDeleting && !isUpdating) {
    return (
      <ErrorMessage
        message={
          error?.data?.message || 'Failed to fetch user book details'
        }
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
      {book && !isDeleting && !isUpdating ? (
        <>
          <BookDetailsCard book={book} type="userBook" />
          <UserBookActions
            ubid={book.id}
            userBook={book}
            onUserBookAction={handleUserBookAction}
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
            {isDeleting ? 'Deleting' : 'Updating'} user book...
          </Typography>
        </Box>
      ) : (
        <div>User book not found.</div>
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

export default UserBookDetailsPage;
