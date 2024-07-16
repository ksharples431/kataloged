import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';

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
    <Container maxWidth="md">
      <Card sx={{ display: 'flex', mt: 4 }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={book.imageLinks?.thumbnail || '/placeholder-image.jpg'}
          alt={book.title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="h5" variant="h5">
              {book.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {book.authors}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ISBN: {book.isbn}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Genre: {book.genre}
            </Typography>
            <Typography variant="body1" paragraph>
              {book.description}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
};

export default SearchDetailsPage;
