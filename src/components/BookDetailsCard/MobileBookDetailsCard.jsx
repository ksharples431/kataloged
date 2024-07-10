import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100%',
  margin: 'auto',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    maxWidth: 800,
  },
}));

const MobileBookDetailsCard = ({ book }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <StyledCard>
      <CardMedia
        component="img"
        sx={{
          width: isMobile ? '100%' : 200,
          height: isMobile ? 300 : 'auto',
          objectFit: 'cover',
        }}
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

MobileBookDetailsCard.propTypes = {
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

export default MobileBookDetailsCard;
