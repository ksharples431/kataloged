import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import GenericList from '../../components/GenericList/GenericList.jsx';
import { useGetGenresQuery } from '../../store/api/apiSlice.js';

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
      <GenericList
        items={data.items}
        type={data.type}
        title="Public Genres"
      />
    </Box>
  );
};

export default GenresPage;
