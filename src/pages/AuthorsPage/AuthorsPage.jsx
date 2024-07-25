import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import AuthorList from '../../components/AuthorList/AuthorList.jsx';
import { useGetAuthorsQuery } from '../../store/api/api.slice.js';

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
      <AuthorList authors={data.authors} />
    </Box>
  );
};

export default AuthorsPage;
