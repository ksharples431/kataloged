import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import GenericList from '../../components/GenericList/GenericList.jsx';
import { useGetUserBooksByGenreQuery } from '../../store/api/apiSlice.js';
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
      {data && data.items && data.items.length > 0 ? (
        <GenericList
          items={data.items}
          type={data.type}
          title={`My Books in ${decodedGenreName}`}
        />
      ) : (
        <p>No books found for this genre in your library.</p>
      )}
    </Box>
  );
};

export default UserGenreBooksPage;
