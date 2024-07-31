import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import GenericList from '../../components/GenericList/GenericList.jsx';
import { useGetUserBooksByAuthorQuery } from '../../store/api/apiSlice.js';
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
      {data && data.items && data.items.length > 0 ? (
        <GenericList
          items={data.items}
          type={data.type}
          title={`My Books by ${decodedAuthorName}`}
        />
      ) : (
        <p>No books found for this author in your library.</p>
      )}
    </Box>
  );
};

export default UserAuthorBooksPage;
