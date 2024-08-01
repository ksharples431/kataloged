import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Snackbar, Alert, Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import GenericList from '../../components/GenericList/GenericList';
import { useGetBooksQuery } from '../../store/api/apiSlice';

const BooksPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const { data, isLoading, isError } = useGetBooksQuery();

  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbar(location.state.snackbar);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message="Failed to fetch books" />;

  return (
    <Box>
      <GenericList
        items={data.items}
        type={data.type}
        title="Public Library"
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

export default BooksPage;
