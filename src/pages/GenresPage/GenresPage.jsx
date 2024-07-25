import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import GenreList from '../../components/GenreList/GenreList.jsx';
import { useGetGenresQuery } from '../../store/api/api.slice.js';

const GenresPage = () => {
  const { data, isLoading, isError } = useGetGenresQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to fetch genres" />;
  }

  return (
    <Box>
      <GenreList genres={data.genres} />
    </Box>
  );
};

export default  GenresPage;
