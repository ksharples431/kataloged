import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import BookDetailsCard from '../../components/BookDetails/BookDetailsCard.jsx';

const SearchDetailsPage = () => {
  const { bid } = useParams();
  const [book, setBook] = useState(null);

  // Try to get the book from Redux store
  const storeBook = useSelector((state) => {
    const queries = state.api.queries;
    const queryKeys = Object.keys(queries).filter((key) =>
      key.startsWith('searchBooks')
    );
    for (let key of queryKeys) {
      const foundBook = queries[key]?.data?.books?.find(
        (b) => b.bid === bid
      );
      if (foundBook) return foundBook;
    }
    return null;
  });

  useEffect(() => {
    console.log('BID:', bid);
    console.log('Store Book:', storeBook);

    if (storeBook) {
      setBook(storeBook);
    } else {
      // If not in Redux, try to get from localStorage
      const lastSearchResults = JSON.parse(
        localStorage.getItem('lastSearchResults') || '[]'
      );
      const storedBook = lastSearchResults.find((b) => b.bid === bid);
      console.log('Local Storage Book:', storedBook);
      if (storedBook) {
        setBook(storedBook);
      }
    }
  }, [bid, storeBook]);

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
      {/* <AddUserBookAction bid={bid} /> */}
    </Box>
  );
};

export default SearchDetailsPage;
