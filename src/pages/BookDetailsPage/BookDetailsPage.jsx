import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookById } from '../../store/books/booksThunks';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import ResponsiveBookDetailsCard from '../../components/BookDetailsCard/ResponsiveBookDetailsCard';

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

  return <ResponsiveBookDetailsCard book={book} />;
};

export default BookDetailsPage;
