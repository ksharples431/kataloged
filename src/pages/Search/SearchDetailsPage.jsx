import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import BookDetailsCard from '../../components/BookDetails/BookDetailsCard.jsx';
import SaveBookFromApiAction from '../../components/Actions/SaveBookFromApiAction.jsx';

const SearchDetailsPage = () => {
  const { bid } = useParams();
  const [book, setBook] = useState(null);

  const originalResults = useSelector(
    (state) => state.search.originalResults
  );

  useEffect(() => {
    const foundBook = originalResults.find(
      (b) => b.bid === bid || b.id === bid
    );

    setBook(foundBook || null);
  }, [bid, originalResults]);

  if (!book) {
    return <Typography>Loading... (Book ID: {bid})</Typography>;
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
      <BookDetailsCard book={book} type="search" />
      <SaveBookFromApiAction bookId={book.bid || book.id} />
    </Box>
  );
};

export default SearchDetailsPage;
