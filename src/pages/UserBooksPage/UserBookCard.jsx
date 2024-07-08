import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { CardContent } from '@mui/material';
import { Card, CardMedia, Typography } from '@mui/material';

const BookCardWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  backgroundColor: theme.palette.primary.main,
  justifyContent: 'center',
  '&:hover': {
    cursor: 'default',
  },
  [theme.breakpoints.down('sm', 'xs')]: {
    flexDirection: 'row',
  },
}));

const BookImage = styled(CardMedia)(({ theme }) => ({
  height: '200px',
  width: '150px',
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    width: '80px',
    height: '110px',
  },
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

const LinkWrapper = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const CardContentWrapper = styled(CardContent)(({ theme }) => ({
  textAlign: 'center',
  padding: '8px 16px',
  paddingBottom: '8px !important',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  [theme.breakpoints.down('sm', 'xs')]: {
    alignItems: 'flex-start',
    textAlign: 'left',
  },
}));

const BookCard = ({ book }) => (
  <BookCardWrapper>
    <LinkWrapper to={`/books/${encodeURIComponent(book.ubid)}`}>
      <BookImage
        component="img"
        image={book.imagePath || '/placeholder-book.jpg'}
        alt={book.title}
      />
    </LinkWrapper>
    <CardContentWrapper>
      <LinkWrapper to={`/books/${encodeURIComponent(book.ubid)}`}>
        <BookTitle variant="h6" component="h2">
          {book.title}
        </BookTitle>
      </LinkWrapper>
      <LinkWrapper to={`/authors/${encodeURIComponent(book.author)}`}>
        <AuthorName variant="body2" color="text.secondary">
          {book.author}
        </AuthorName>
      </LinkWrapper>
    </CardContentWrapper>
  </BookCardWrapper>
);

BookCard.propTypes = {
  book: PropTypes.shape({
    ubid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
  }).isRequired,
};

export default BookCard;
