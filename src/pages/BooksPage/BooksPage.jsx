import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import BookList from '../../components/BookList/BookList.jsx';
import { useGetBooksQuery } from '../../store/api/api.slice.js';

const BooksPage = () => {
  const { data, isLoading, isError } = useGetBooksQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message={data.message} />;
  }

  return (
    <Box>
      <BookList books={data.books} type="book" />
    </Box>
  );
};

export default BooksPage;
