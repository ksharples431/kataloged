import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useGetUserBookByIdQuery } from '../../store/api/apiSlice.js';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import BookDetailsCard from '../../components/BookDetails/BookDetailsCard.jsx';
import UserBookActions from '../../components/Actions/UserBookActions.jsx';

const UserBookDetailsPage = () => {
  const { ubid } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetUserBookByIdQuery(ubid);

  const handleUserBookDeleted = () => {
    navigate('/userBooks');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to fetch user book details" />;
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
      {book ? (
        <>
          <BookDetailsCard book={book} type="book" />
          <UserBookActions
            ubid={book.id}
            userBook={book}
            onUserBookDeleted={handleUserBookDeleted}
          />
        </>
      ) : (
        <div>Book not found or has been deleted.</div>
      )}
    </Box>
  );
};

export default UserBookDetailsPage;
