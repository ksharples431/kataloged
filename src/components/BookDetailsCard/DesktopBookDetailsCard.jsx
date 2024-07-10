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

const DesktopBookDetailsCard = ({ book }) => {
  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <StyledCard>
      <CardMedia
        component="img"
        sx={{ width: 200, objectFit: 'cover' }}
        image={book.imagePath}
        alt={book.title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {book.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom>
            By {book.author}
          </Typography>
          <Chip label={book.genre} size="small" sx={{ marginBottom: 2 }} />
          {book.seriesName && (
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom>
              Series: {book.seriesName}{' '}
              {book.seriesNumber && `(Book ${book.seriesNumber})`}
            </Typography>
          )}
          <Typography variant="body1" paragraph color="text.secondary">
            {book.description}
          </Typography>
        </CardContent>
      </Box>
    </StyledCard>
  );
};

DesktopBookDetailsCard.propTypes = {
  book: PropTypes.shape({
    bid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    seriesName: PropTypes.string,
    seriesNumber: PropTypes.string,
  }),
};

export default DesktopBookDetailsCard;
