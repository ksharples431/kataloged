import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import UserGenreList from './genreComponents/UserGenreList';
import { useUserGenres } from './genreHooks/useUserGenres';
import { useSnackbar } from '../../hooks/useSnackbar';
import SortOption from '../../components/UI/SortOption';

const UserGenresPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');

  const { userGenres, isLoading, isError, error } = useUserGenres({
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
      setOrder(newSortBy === 'bookCount' ? 'desc' : 'asc');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <ErrorMessage
        message={error?.data?.message || 'Failed to fetch user genres'}
      />
    );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        My Genres
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
          label="Name"
          sortKey="name"
          currentSortBy={sortBy}
          currentOrder={order}
          onSort={handleSort}
        />
        <SortOption
          label="Book Count"
          sortKey="bookCount"
          currentSortBy={sortBy}
          currentOrder={order}
          onSort={handleSort}
        />
      </Box>
      {userGenres && userGenres.length > 0 ? (
        <UserGenreList userGenres={userGenres} />
      ) : (
        <Typography>No genres available in your collection.</Typography>
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

export default UserGenresPage;
