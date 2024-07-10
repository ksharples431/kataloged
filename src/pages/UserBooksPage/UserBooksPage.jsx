import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import ResponsiveUserBookList from '../../components/UserBookList/ResponsiveUserBookList.jsx';

import { fetchUserBooks } from '../../store/userBooks/userBooksThunks';

const UserBooksPage = () => {
  const dispatch = useDispatch();
  const { userBooks = [], status, error } = useSelector(
    (state) => state.userBooks
  );
  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated ?? false
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
    <Box>
      <ResponsiveUserBookList userBooks={userBooks} />
    </Box>
  );
};

export default UserBooksPage;
