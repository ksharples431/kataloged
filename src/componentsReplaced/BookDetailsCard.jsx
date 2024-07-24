import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import { fetchBookById } from '../store/books/booksThunks';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

const BookDetailsCard = () => {
  const { bid } = useParams();
  const dispatch = useDispatch();
  const { books, error, status } = useSelector((state) => state.books);
  const book = books.find((book) => book.bid === bid);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!book) {
      dispatch(fetchBookById(bid));
    }
  }, [bid, book, dispatch]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <ErrorMessage message={error} />;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh', // Ensure the container takes up the full height of the viewport
      }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          mb: 4,
          maxWidth: '800px',
          width: '100%', // Ensure the card doesn't exceed the max width
        }}>
        <CardMedia
          component="img"
          sx={{
            width: isSmallScreen ? '100%' : 200,
            height: isSmallScreen ? 300 : 'auto',
            objectFit: 'cover',
          }}
          image={book.imagePath}
          alt={book.title}
        />
        <Box
          sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="h2" variant="h4" gutterBottom>
              {book.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              gutterBottom>
              By {book.author}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              gutterBottom>
              Genre: {book.genre}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" paragraph>
                {book.description}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
};

export default BookDetailsCard;