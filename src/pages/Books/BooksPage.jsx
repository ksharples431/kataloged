import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import GenericList from '../../components/GenericList/GenericList.jsx';
import { useGetBooksQuery } from '../../store/api/apiSlice.js';

const BooksPage = () => {
  const { data, isLoading, isError } = useGetBooksQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to fetch books" />;
  }

  return (
    <Box>
      <GenericList
        items={data.items}
        type={data.type}
        title="Public Library"
      />
    </Box>
  );
};

export default BooksPage;
