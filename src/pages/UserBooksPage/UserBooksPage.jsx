import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import BookList from '../../components/BookList/BookList.jsx';
import { useGetUserBooksQuery } from '../../store/api/api.slice.js';

const UserBooksPage = () => {
  const uid = useSelector((state) => state.auth.user?.uid);
  const { data, isLoading, isError } = useGetUserBooksQuery(
    { uid },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message={data.message} />;
  }

  return (
    <Box>
      <BookList books={data.userBooks} type="user" />
    </Box>
  );
};

export default UserBooksPage;
