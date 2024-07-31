import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
} from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import BookDetailsCard from '../../components/BookDetails/BookDetailsCard.jsx';
import BookActions from '../../components/Actions/BookActions.jsx';
import { useGetBookByIdQuery } from '../../store/api/apiSlice.js';

const BookDetailsPage = () => {
  const { bid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const { data, isLoading, isError, error, refetch } = useGetBookByIdQuery(
    bid,
    {
      skip: !bid,
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch, bid]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const updateStatus = queryParams.get('update');

    if (updateStatus === 'success') {
      setSnackbar({
        open: true,
        message: 'Book updated successfully!',
        severity: 'success',
      });
      // Remove the query parameter
      navigate(location.pathname, { replace: true });
    }

    refetch();
  }, [location, navigate, refetch]);


  const handleDeleteStart = () => {
    setIsDeleting(true);
  };

  const handleUpdateStart = () => {
    setIsUpdating(true);
  };

  const handleBookAction = (success, message, action) => {
    setSnackbar({
      open: true,
      message,
      severity: success ? 'success' : 'error',
    });
    if (success) {
      if (action === 'delete') {
        setTimeout(() => navigate('/books'), 3000);
      }
    }
    setIsDeleting(false);
    setIsUpdating(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && !isDeleting) {
    return (
      <ErrorMessage
        message={error?.data?.message || 'Failed to fetch book details'}
      />
    );
  }

  const transformedData = data?.transformed;
  const book = transformedData?.items?.[0];
  const originalBook = data?.original;

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
          <BookDetailsCard book={book} type={transformedData.type} />
          <BookActions
            bid={book.id}
            book={originalBook}
            onBookAction={handleBookAction}
            onDeleteStart={handleDeleteStart}
            onUpdateStart={handleUpdateStart}
          />
        </>
      ) : isDeleting ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}>
          <CircularProgress />
          <Typography>Deleting book...</Typography>
        </Box>
      ) : isUpdating ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}>
          <CircularProgress />
          <Typography>Updating book...</Typography>
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
