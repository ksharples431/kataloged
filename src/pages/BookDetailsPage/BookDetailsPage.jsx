import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import BookDetailsCard from '../../components/BookDetails/BookDetailsCard';
// import AddUserBookAction from '../../components/ButtonActions/AddUserBookAction';
import { useGetBookByIdQuery } from '../../store/api/api.slice';

const BookDetailsPage = () => {
  const { bid } = useParams();
  const { data, isLoading, isError } = useGetBookByIdQuery(bid);

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
      <BookDetailsCard book={data.book} type="book" />
      {/* <AddUserBookAction bid={bid} /> */}
    </Box>
  );
};

export default BookDetailsPage;
