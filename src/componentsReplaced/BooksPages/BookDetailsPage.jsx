import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import BookDetailsCard from '../../components/BookDetails/BookDetailsCard.jsx';
import BookActions from '../../components/Actions/BookActions.jsx';
import { useGetBookByIdQuery } from '../../store/api/apiSlice.js';

const BookDetailsPage = () => {
  const { bid } = useParams();
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const { data, isLoading, isError } = useGetBookByIdQuery(bid);

  useEffect(() => {
    if (isDeleted) {
      navigate('/books');
    }
  }, [isDeleted, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message={data.message} />;
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
      {!isDeleted ? (
        <>
          <BookDetailsCard book={data.book} type="book" />
          <BookActions
            bid={bid}
            book={data.book}
            onBookDeleted={() => setIsDeleted(true)}
          />
        </>
      ) : (
        <div>Book not found or has been deleted.</div>
      )}
    </Box>
  );
};

export default BookDetailsPage;
