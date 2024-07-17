import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import BookDetailsCard from '../../components/BookDetails/BookDetailsCard.jsx';
import SaveBookFromApiAction from '../../components/ButtonActions/SaveBookFromApiAction.jsx'

const SearchDetailsPage = () => {
  const { bid } = useParams();
  const [book, setBook] = useState(null);

  // Try to get the book from Redux store
  const storeBook = useSelector((state) =>
    state.search.results.find((b) => b.bid === bid)
  );

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
      <SaveBookFromApiAction bid={bid} />
    </Box>
  );
};

export default SearchDetailsPage;
