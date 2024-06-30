import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';
import BookGrid from './BookGrid';
import { fetchBooks } from '../../store/books/booksThunks';
import { BookListWrapper, BookListTitle } from './BookList.styles';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <ErrorMessage message={error} />;
  }

  return (
    <BookListWrapper>
      <BookListTitle variant="h4" component="h1" gutterBottom>
        Books
      </BookListTitle>
      <BookGrid books={books} />
    </BookListWrapper>
  );
};

export default BookList;
