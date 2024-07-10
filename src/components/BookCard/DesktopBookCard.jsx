import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, CardMedia, Typography, CardContent } from '@mui/material';

const BookCardWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  height: '100%',
}));

const BookImage = styled(CardMedia)(() => ({
  height: '200px',
  width: '150px',
  objectFit: 'cover',
}));

const BookTitle = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  whiteSpace: 'normal',
  fontSize: '1rem',
  color: theme.palette.text.primary,
}));

const AuthorName = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  whiteSpace: 'normal',
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const LinkWrapper = styled(Link)(({theme}) => ({
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

const DesktopBookCard = ({ book }) => (
  <BookCardWrapper>
    <LinkWrapper to={`/books/${encodeURIComponent(book.bid)}`}>
      <BookImage
        component="img"
        image={book.imagePath || '/placeholder-book.jpg'}
        alt={book.title}
      />
    </LinkWrapper>
    <CardContentWrapper>
      <LinkWrapper to={`/books/${encodeURIComponent(book.bid)}`}>
        <BookTitle variant="h6" component="h2">
          {book.title}
        </BookTitle>
      </LinkWrapper>
      <LinkWrapper to={`/authors/${encodeURIComponent(book.author)}`}>
        <AuthorName variant="body2">{book.author}</AuthorName>
      </LinkWrapper>
    </CardContentWrapper>
  </BookCardWrapper>
);

DesktopBookCard.propTypes = {
  book: PropTypes.shape({
    bid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
  }).isRequired,
};

export default DesktopBookCard;
