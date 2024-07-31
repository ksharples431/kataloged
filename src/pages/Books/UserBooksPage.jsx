import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner.jsx';
import ErrorMessage from '../../components/UI/ErrorMessage.jsx';
import GenericList from '../../components/GenericList/GenericList.jsx';
import { useGetUserBooksQuery } from '../../store/api/apiSlice.js';

const UserBooksPage = () => {
  const uid = useSelector((state) => state.auth.user?.uid);
  const { data, isLoading, isError } = useGetUserBooksQuery(
    { uid },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to fetch user's books" />;
  }

  return (
    <Box>
      <GenericList items={data.items} type={data.type} title="My Books" />
    </Box>
  );
};

export default UserBooksPage;
