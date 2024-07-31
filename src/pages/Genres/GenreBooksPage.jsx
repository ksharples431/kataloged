import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import GenericList from '../../components/GenericList/GenericList.jsx';
import { useGetBooksByGenreQuery } from '../../store/api/apiSlice.js';

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
      {data && data.items && data.items.length > 0 ? (
        <GenericList
          items={data.items}
          type={data.type}
          title={`Books in ${decodedGenreName}`}
        />
      ) : (
        <p>No books found for this genre.</p>
      )}
    </Box>
  );
};

export default GenreBooksPage;
