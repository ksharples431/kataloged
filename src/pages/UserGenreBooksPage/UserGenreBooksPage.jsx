import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import BookList from '../../components/BookList/BookList.jsx';
import { useGetUserBooksByGenreQuery } from '../../store/api/api.slice.js';
import { useSelector } from 'react-redux';

const UserGenreBooksPage = () => {
  const { genreName } = useParams();
  const decodedGenreName = decodeURIComponent(genreName);
  const uid = useSelector((state) => state.auth.user.uid);

  const { data, isLoading, isError } = useGetUserBooksByGenreQuery({
    uid,
    genre: decodedGenreName,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <ErrorMessage message="Failed to fetch user's books by genre" />
    );
  }

  return (
    <Box>
      <h1>My Books in {decodedGenreName}</h1>
      <BookList books={data.books} type="user" />
    </Box>
  );
};

export default UserGenreBooksPage;
