
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useGetUserBookByIdQuery } from '../../store/api/api.slice';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import ResponsiveUserBookDetailsCard from '../../components/UserBookDetailsCard/ResponsiveUserBookDetailsCard';
// import AddUserBookAction from '../../components/ButtonActions/AddUserBookAction';

const UserBookDetailsPage = () => {
const { ubid } = useParams();
const { data, isLoading, isError } = useGetUserBookByIdQuery(ubid);

if (isLoading) {
  return <LoadingSpinner />;
}

if (isError) {
  return <ErrorMessage message={data.message} />;
}

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        maxWidth: 800,
        margin: 'auto',
        padding: 2,
      }}>
      <ResponsiveUserBookDetailsCard userBook={data.userBook} />
      {/* <AddUserBookAction ubid={ubid} /> */}
    </Box>
  );
};

export default UserBookDetailsPage;
