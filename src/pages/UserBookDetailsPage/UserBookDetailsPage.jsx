import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useGetUserBookByIdQuery } from '../../store/api/api.slice';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import BookDetailsCard from '../../components/BookDetails/BookDetailsCard';
import UserBookActions from '../../components/ButtonActions/UserBookActions.jsx';

const UserBookDetailsPage = () => {
  const { ubid } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetUserBookByIdQuery(ubid);

  const handleUserBookDeleted = () => {
    // Navigate back to the user's library or another appropriate page
    navigate('/userBooks');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message={data?.message || 'An error occurred'} />;
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
      <BookDetailsCard book={data.userBook} type="user" />
      <UserBookActions
        ubid={data.userBook.ubid}
        userBook={data.userBook}
        onUserBookDeleted={handleUserBookDeleted}
      />
    </Box>
  );
};

export default UserBookDetailsPage;
