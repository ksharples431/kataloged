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

const UserBookDetailsCard = ({ userBook }) => {
  if (!userBook) {
    return <div>User book not found</div>;
  }

  return (
    <StyledCard>
      <CardMedia
        sx={{ width: '200px', height: '300px', overflow: 'hidden' }}
        alt={userBook.title}>
        <img
          src={userBook.imagePath || '/placeholder-book.jpg'}
          alt={userBook.title}
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
            {userBook.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom>
            By {userBook.author}
          </Typography>
          {userBook.genre && (
            <Chip
              label={userBook.genre}
              size="small"
              sx={{
                marginBottom: 2,
                backgroundColor: 'main.darkSlateBlue',
                color: 'white',
              }}
            />
          )}
          {userBook.seriesName && (
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom>
              Series: {userBook.seriesName}{' '}
              {userBook.seriesNumber && `(Book ${userBook.seriesNumber})`}
            </Typography>
          )}
          {userBook.description && (
            <Typography variant="body1" paragraph color="text.secondary">
              {userBook.description}
            </Typography>
          )}
          {userBook.isbn && (
            <Typography variant="body2" color="text.secondary">
              ISBN: {userBook.isbn}
            </Typography>
          )}
        </CardContent>
      </Box>
    </StyledCard>
  );
};

UserBookDetailsCard.propTypes = {
  userBook: PropTypes.shape({
    ubid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    genre: PropTypes.string,
    description: PropTypes.string,
    isbn: PropTypes.string,
    seriesName: PropTypes.string,
    seriesNumber: PropTypes.string,
  }).isRequired,
};

export default UserBookDetailsCard;
