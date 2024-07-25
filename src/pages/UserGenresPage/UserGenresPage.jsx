import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import UserGenreList from '../../components/UserGenreList/UserGenreList.jsx';
import { useGetUserGenresQuery } from '../../store/api/api.slice.js';
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
      <h1>My Genres</h1>
      <UserGenreList genres={data.genres} />
    </Box>
  );
};

export default UserGenresPage;
