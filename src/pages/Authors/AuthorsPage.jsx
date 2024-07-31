import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import GenericList from '../../components/GenericList/GenericList.jsx';
import { useGetAuthorsQuery } from '../../store/api/apiSlice.js';

const AuthorsPage = () => {
  const { data, isLoading, isError } = useGetAuthorsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to fetch authors" />;
  }

  return (
    <Box>
      {data && data.items && data.items.length > 0 ? (
        <GenericList
          items={data.items}
          type={data.type}
          title="Public Authors"
        />
      ) : (
        <p>No authors found.</p>
      )}
    </Box>
  );
};

export default AuthorsPage;
