import { Box } from '@mui/material';
import LoadingSpinner from '../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../components/UI/ErrorMessage.jsx';
import GenericList from '../components/GenericList/GenericList.jsx';
import { useGetUserGenresQuery } from '../store/api/apiSlice.js';
import { useSelector } from 'react-redux';

const UserGenresPage = () => {
  const uid = useSelector((state) => state.auth.user.uid);
  const { data, isLoading, isError } = useGetUserGenresQuery({ uid });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to fetch user's genres" />;
  }

  return (
    <Box>
      <GenericList items={data.items} type={data.type} title="My Genres" />
    </Box>
  );
};

export default UserGenresPage;
