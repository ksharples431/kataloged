import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import GenericList from '../../components/GenericList/GenericList.jsx';
import { useGetUserAuthorsQuery } from '../../store/api/apiSlice.js';
import { useSelector } from 'react-redux';

const UserAuthorsPage = () => {
  const uid = useSelector((state) => state.auth.user.uid);
  const { data, isLoading, isError } = useGetUserAuthorsQuery({ uid });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to fetch user's authors" />;
  }

  return (
    <Box>
      {data && data.items && data.items.length > 0 ? (
        <GenericList
          items={data.items}
          type={data.type}
          title="My Authors"
        />
      ) : (
        <p>No authors found in your library.</p>
      )}
    </Box>
  );
};

export default UserAuthorsPage;
