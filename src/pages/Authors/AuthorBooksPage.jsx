import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import GenericList from '../../components/GenericList/GenericList.jsx';
import { useGetBooksByAuthorQuery } from '../../store/api/apiSlice.js';

const AuthorBooksPage = () => {
  const { authorName } = useParams();
  const decodedAuthorName = decodeURIComponent(authorName);

  const { data, isLoading, isError } = useGetBooksByAuthorQuery({
    author: decodedAuthorName,
  });

  console.log('Author Books Data:', data);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to fetch author's books" />;
  }

  return (
    <Box>
      {data && data.items && data.items.length > 0 ? (
        <GenericList
          items={data.items}
          type={data.type}
          title={`Books by ${decodedAuthorName}`}
        />
      ) : (
        <p>No books found for this author.</p>
      )}
    </Box>
  );
};

export default AuthorBooksPage;
