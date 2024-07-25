import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import UserAuthorList from '../../components/UserAuthorList/UserAuthorList.jsx';
import { useGetUserAuthorsQuery } from '../../store/api/api.slice.js';
import { useSelector } from 'react-redux';

const UserAuthorsPage = () => {
  const uid = useSelector((state) => state.auth.user.uid);
  console.log(uid)
  const { data, isLoading, isError } = useGetUserAuthorsQuery({ uid });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to fetch user's authors" />;
  }

  return (
    <Box>
      <h1>My Authors</h1>
      <UserAuthorList authors={data.authors} />
    </Box>
  );
};

export default UserAuthorsPage;
