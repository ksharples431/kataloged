import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import BookList from '../../components/BookList/BookList.jsx';
import { useGetUserBooksByAuthorQuery } from '../../store/api/api.slice.js';
import { useSelector } from 'react-redux';

const UserAuthorBooksPage = () => {
  const { authorName } = useParams();
  const decodedAuthorName = decodeURIComponent(authorName);
  const uid = useSelector((state) => state.auth.user.uid);

  const { data, isLoading, isError } = useGetUserBooksByAuthorQuery({
    uid,
    author: decodedAuthorName,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <ErrorMessage message="Failed to fetch user's books by author" />
    );
  }

  return (
    <Box>
      <h1>My Books by {decodedAuthorName}</h1>
      <BookList books={data.books} type="user" />
    </Box>
  );
};

export default UserAuthorBooksPage;
