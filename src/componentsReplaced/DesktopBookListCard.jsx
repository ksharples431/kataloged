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

const BookImageWrapper = styled(CardMedia)(() => ({
  height: '200px',
  width: '150px',
  overflow: 'hidden',
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

const DesktopBookListCard = ({ book, type }) => {
  const getBookLink = () => {
    switch (type) {
      case 'user':
        return `/userBooks/${encodeURIComponent(book.ubid)}`;
      case 'search':
        return `/search/${encodeURIComponent(book.bid)}`;
      default:
        return `/books/${encodeURIComponent(book.bid)}`;
    }
  };

  return (
    <BookCardWrapper>
      <LinkWrapper to={getBookLink()}>
        <BookImageWrapper>
          <img
            src={book.imagePath || '/placeholder-book.jpg'}
            alt={book.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </BookImageWrapper>
      </LinkWrapper>
      <CardContentWrapper>
        <LinkWrapper to={getBookLink()}>
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
};

DesktopBookListCard.propTypes = {
  book: PropTypes.shape({
    bid: PropTypes.string,
    ubid: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    isbn: PropTypes.string,
    seriesName: PropTypes.string,
    seriesNumber: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['book', 'user', 'search']).isRequired,
};

export default DesktopBookListCard;
