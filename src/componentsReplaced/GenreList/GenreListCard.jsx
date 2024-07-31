import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, Typography, CardContent, Avatar } from '@mui/material';

const GenreCardWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  height: '100%',
}));

const GenreAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  fontSize: '1.5rem',
  marginBottom: theme.spacing(1),
  wordBreak: 'break-word',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const GenreName = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  whiteSpace: 'normal',
  fontSize: '1rem',
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

const BookCount = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const LinkWrapper = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const CardContentWrapper = styled(CardContent)(() => ({
  textAlign: 'center',
  padding: '8px 16px',
  paddingBottom: '8px !important',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
}));

const DesktopGenreListCard = ({ genre }) => {
  return (
    <GenreCardWrapper>
      <LinkWrapper to={`/genres/${encodeURIComponent(genre.genre)}`}>
        <GenreAvatar>{genre.genre}</GenreAvatar>
      </LinkWrapper>
      <CardContentWrapper>
        <LinkWrapper to={`/genres/${encodeURIComponent(genre.genre)}`}>
          <GenreName variant="h6" component="h2">
            {genre.genre}
          </GenreName>
        </LinkWrapper>
        <BookCount variant="body2">
          {genre.bookCount} {genre.bookCount === 1 ? 'book' : 'books'}
        </BookCount>
      </CardContentWrapper>
    </GenreCardWrapper>
  );
};

DesktopGenreListCard.propTypes = {
  genre: PropTypes.shape({
    genre: PropTypes.string.isRequired,
    bookCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default DesktopGenreListCard;
