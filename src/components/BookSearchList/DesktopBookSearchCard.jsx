import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const DesktopBookSearchCard = ({ book }) => {
  return (
    <>
      <Link to={`/search/${book.bid}`} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            width: 128,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Box sx={{ width: 128, height: 197, position: 'relative' }}>
            <CardMedia
              component="img"
              image={
                book.imageLinks?.thumbnail || '/placeholder-image.jpg'
              }
              alt={book.title}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
          <CardContent sx={{ flexGrow: 1, p: 1 }}>
            <Typography variant="subtitle2" component="div" noWrap>
              {book.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {book.authors}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {book.genre}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};


DesktopBookSearchCard.propTypes = {
  book: PropTypes.shape({
    bid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    genre: PropTypes.string,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
  }).isRequired,
};

export default DesktopBookSearchCard;
