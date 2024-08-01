import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  maxWidth: 800,
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const DesktopBookDetailsCard = ({ book, type }) => {
  if (!book) {
    return <div>Book not found</div>;
  }

  const bookName = book.name || book.title;
  const bookAuthor = book.secondaryText || book.author;

  return (
    <StyledCard>
      <CardMedia
        sx={{ width: '200px', height: '300px', overflow: 'hidden' }}
        alt={bookName}>
        <img
          src={book.imagePath || '/placeholder-book.jpg'}
          alt={bookName}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </CardMedia>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
          <Typography
            variant="h5"
            color="main.darkSlateBlue"
            component="div"
            gutterBottom>
            {bookName}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom>
            By {bookAuthor}
          </Typography>
          {book.genre && (
            <Chip
              label={book.genre}
              size="small"
              sx={{
                marginBottom: 2,
                backgroundColor: 'main.darkSlateBlue',
                color: 'white',
              }}
            />
          )}
          {book.seriesName && (
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom>
              Series: {book.seriesName}{' '}
              {book.seriesNumber && `(Book ${book.seriesNumber})`}
            </Typography>
          )}
          {book.description && (
            <Typography variant="body1" paragraph color="text.secondary">
              {book.description}
            </Typography>
          )}
          {book.isbn && (
            <Typography variant="body2" color="text.secondary">
              ISBN: {book.isbn}
            </Typography>
          )}
          {type === 'user' && book.owned && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: 2 }}>
              Owned: {book.owned}
            </Typography>
          )}
        </CardContent>
      </Box>
    </StyledCard>
  );
};

DesktopBookDetailsCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    name: PropTypes.string,
    secondaryText: PropTypes.string,
    imagePath: PropTypes.string,
    genre: PropTypes.string,
    description: PropTypes.string,
    owned: PropTypes.string,
    isbn: PropTypes.string,
    seriesName: PropTypes.string,
    seriesNumber: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['book', 'user', 'search']).isRequired,
};

export default DesktopBookDetailsCard;
