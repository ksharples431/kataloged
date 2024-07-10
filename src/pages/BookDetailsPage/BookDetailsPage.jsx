import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { fetchBookById } from '../../store/books/booksThunks';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import ResponsiveBookDetailsCard from '../../components/BookDetailsCard/ResponsiveBookDetailsCard';
import AddUserBookAction from '../../components/ButtonActions/AddUserBookAction';

const BookDetailsPage = () => {
  const { bid } = useParams();
  const dispatch = useDispatch();
  const { books, error, status } = useSelector((state) => state.books);
  const book = books.find((book) => book.bid === bid);

  useEffect(() => {
    if (!book) {
      dispatch(fetchBookById(bid));
    }
  }, [bid, book, dispatch]);

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
      <ResponsiveBookDetailsCard book={book} />
      <AddUserBookAction bid={bid}/>
    </Box>
  );
};

export default BookDetailsPage;
