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
import UserBookDetailsCard from './userBookComponents/UserBookDetailsCard';
import UserBookActions from './userBookActions/UserBookActions';
import { useUserBookDetails } from './userBookHooks/useUserBookDetails';
import { useUserBookActions } from './userBookHooks/useUserBookActions';
import { useSnackbar } from '../../hooks/useSnackbar';

const UserBookDetailsPage = () => {
  const { ubid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { userBook, isLoading, isError, error } = useUserBookDetails(ubid);
  const {
    isDeleting,
    isUpdating,
    handleDeleteStart,
    handleUpdateStart,
    deleteUserBook
  } = useUserBookActions();
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

  const handleUserBookAction = useCallback(
    async (success, message, action) => {
      if (action === 'delete') {
        handleDeleteStart();
        try {
          await deleteUserBook(ubid).unwrap();
          navigate('/user-books', {
            state: {
              snackbar: {
                message: 'User book deleted successfully!',
                severity: 'success',
              },
            },
          });
        } catch (err) {
          showSnackbar(
            err.data?.message || 'Failed to delete user book',
            'error'
          );
        }
      } else {
        showSnackbar(message, success ? 'success' : 'error');
      }
    },
    [ubid, deleteUserBook, handleDeleteStart, navigate, showSnackbar]
  );

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
      {userBook && !isDeleting && !isUpdating ? (
        <>
          <UserBookDetailsCard userBook={userBook} />
          <UserBookActions
            ubid={userBook.ubid}
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
