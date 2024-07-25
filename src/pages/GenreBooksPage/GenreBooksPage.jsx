import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import BookList from '../../components/BookList/BookList.jsx';
import { useGetBooksByGenreQuery } from '../../store/api/api.slice.js';

const GenreBooksPage = () => {
  const { genreName } = useParams();
  const decodedGenreName = decodeURIComponent(genreName);

  const { data, isLoading, isError } = useGetBooksByGenreQuery({
    genre: decodedGenreName,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to fetch genre's books" />;
  }

  return (
    <Box>
      <h1>Books by {decodedGenreName}</h1>
      <BookList books={data.books} type="book" />
    </Box>
  );
};

export default GenreBooksPage;
