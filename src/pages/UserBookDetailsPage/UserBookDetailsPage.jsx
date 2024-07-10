import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { fetchUserBookById } from '../../store/userBooks/userBooksThunks';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import ResponsiveUserBookDetailsCard from '../../components/UserBookDetailsCard/ResponsiveUserBookDetailsCard';
// import AddUserBookAction from '../../components/ButtonActions/AddUserBookAction';

const UserBookDetailsPage = () => {
  const { ubid } = useParams();
  const dispatch = useDispatch();
  const { userBooks, error, status } = useSelector((state) => state.userBooks);
  const userBook = userBooks.find((userBook) => userBook.ubid === ubid);

  useEffect(() => {
    if (!userBook) {
      dispatch(fetchUserBookById(ubid));
    }
  }, [ubid, userBook, dispatch]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <ErrorMessage message={error} />;
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
      <ResponsiveUserBookDetailsCard userBook={userBook} />
      {/* <AddUserBookAction ubid={ubid} /> */}
    </Box>
  );
};

export default UserBookDetailsPage;
