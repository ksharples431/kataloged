import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, CardMedia, Typography, Box } from '@mui/material';

const BookCardWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  marginBottom: theme.spacing(0.5),
  width: '100%',
  maxWidth: '100vw',
  height: '70px',
  boxSizing: 'border-box',
}));

const BookImageWrapper = styled(CardMedia)(({ theme }) => ({
  width: '46px',
  height: '70px',
  objectFit: 'hidden',
  marginRight: theme.spacing(1),
}));

const BookDetails = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: 1,
  minWidth: 0,
  height: '100%',
});

const BookTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.25),
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const AuthorName = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const LinkWrapper = styled(Link)(() => ({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const MobileBookListCard = ({ book, type }) => {
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
            src={book.imagePath}
            alt={book.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </BookImageWrapper>
      </LinkWrapper>
      <BookDetails>
        <LinkWrapper to={getBookLink()}>
          <BookTitle variant="subtitle2" component="h2">
            {book.title}
          </BookTitle>
        </LinkWrapper>
        <LinkWrapper to={`/authors/${encodeURIComponent(book.author)}`}>
          <AuthorName variant="body2">{book.author}</AuthorName>
        </LinkWrapper>
      </BookDetails>
    </BookCardWrapper>
  );
};

MobileBookListCard.propTypes = {
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

export default MobileBookListCard;
