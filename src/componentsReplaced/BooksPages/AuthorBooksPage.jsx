import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import BookList from '../../components/GenericList/GenericList.jsx';
import { useGetBooksByAuthorQuery } from '../../store/api/apiSlice.js';

const AuthorBooksPage = () => {
  const { authorName } = useParams();
  const decodedAuthorName = decodeURIComponent(authorName);

  const { data, isLoading, isError } = useGetBooksByAuthorQuery({
    author: decodedAuthorName,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to fetch author's books" />;
  }

  return (
    <Box>
      <h1>Books by {decodedAuthorName}</h1>
      <BookList books={data.books} type="book" />
    </Box>
  );
};

export default AuthorBooksPage;
