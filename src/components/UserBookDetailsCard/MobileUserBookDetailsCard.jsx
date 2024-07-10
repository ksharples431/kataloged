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

const MobileUserBookDetailsCard = ({ userBook }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!userBook) {
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
        image={userBook.imagePath}
        alt={userBook.title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {userBook.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom>
            By {userBook.author}
          </Typography>
          <Chip label={userBook.genre} size="small" sx={{ marginBottom: 2 }} />
          {userBook.seriesName && (
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom>
              Series: {userBook.seriesName}{' '}
              {userBook.seriesNumber && `(Book ${userBook.seriesNumber})`}
            </Typography>
          )}
          <Typography variant="body1" paragraph color="text.secondary">
            {userBook.description}
          </Typography>
        </CardContent>
      </Box>
    </StyledCard>
  );
};

MobileUserBookDetailsCard.propTypes = {
  userBook: PropTypes.shape({
    ubid: PropTypes.string.isRequired,
    title: PropTypes.string,
    author: PropTypes.string,
    genre: PropTypes.string,
    description: PropTypes.string,
    imagePath: PropTypes.string,
    seriesName: PropTypes.string,
    seriesNumber: PropTypes.string,
  }),
};

export default MobileUserBookDetailsCard;
