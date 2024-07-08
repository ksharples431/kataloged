import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Grid, Typography } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';

import { fetchUserBooks } from '../../store/userBooks/userBooksThunks';
import UserBookCard from './UserBookCard';

const UserBooksList = () => {
  const dispatch = useDispatch();
  const { userBooks, status, error } = useSelector((state) => state.userBooks);
  const isAuthenticated = useSelector(
    (state) => state.users.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated && status === 'idle') {
      dispatch(fetchUserBooks());
    }
  }, [isAuthenticated, status, dispatch]);

  if (!isAuthenticated) {
    return <div>Please sign in to view books.</div>;
  }

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <ErrorMessage message={error} />;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Books
      </Typography>
      <Grid container spacing={2}>
        {userBooks.map((book) => (
          <Grid item xs={12} sm={4} md={3} lg={2.4} key={book.bid}>
            <UserBookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserBooksList;
