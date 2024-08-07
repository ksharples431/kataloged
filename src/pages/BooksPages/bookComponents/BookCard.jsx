import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, Typography, CardContent, CardMedia } from '@mui/material';

const CardWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  height: '100%',
}));

const ImageWrapper = styled(CardMedia)(({ theme }) => ({
  height: '200px',
  width: '150px',
  overflow: 'hidden',
  marginBottom: theme.spacing(1),
}));

const PrimaryText = styled(Typography)(({ theme }) => ({
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

const SecondaryText = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  whiteSpace: 'normal',
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

const BookCard = ({ book }) => (
  <CardWrapper>
    <LinkWrapper to={`/books/${book.bid}`}>
      <ImageWrapper>
        <img
          src={book.imagePath || '/placeholder-book.jpg'}
          alt={book.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </ImageWrapper>
    </LinkWrapper>
    <CardContentWrapper>
      <LinkWrapper to={`/books/${book.bid}`}>
        <PrimaryText variant="h6" component="h2">
          {book.title}
        </PrimaryText>
      </LinkWrapper>
      <SecondaryText variant="body2">{book.author}</SecondaryText>
    </CardContentWrapper>
  </CardWrapper>
);

BookCard.propTypes = {
  book: PropTypes.shape({
    bid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
  }).isRequired,
};

export default BookCard;
