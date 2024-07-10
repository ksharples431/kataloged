import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, CardMedia, Typography, Box } from '@mui/material';

const BookCardWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center', // This centers the content vertically
  // padding: theme.spacing(0.5), // Reduced padding
  backgroundColor: theme.palette.primary.main,
  marginBottom: theme.spacing(0.5), // Reduced margin
  width: '100%',
  maxWidth: '100vw',
  height: '70px', // Slightly reduced height
  boxSizing: 'border-box',
}));

const BookImage = styled(CardMedia)(({ theme }) => ({
  width: '46px', // Slightly reduced width to maintain aspect ratio
  height: '70px',
  objectFit: 'cover',
  marginRight: theme.spacing(1),
}));

const BookDetails = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: 1,
  minWidth: 0, // This is important for text truncation to work
  height: '100%', // This ensures the details box takes full height of the card
});

const BookTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.25), // Reduced margin
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

const MobileBookCard = ({ book }) => (
  <BookCardWrapper>
    <LinkWrapper to={`/books/${encodeURIComponent(book.bid)}`}>
      <BookImage
        component="img"
        image={book.imagePath || '/placeholder-book.jpg'}
        alt={book.title}
      />
    </LinkWrapper>
    <BookDetails>
      <LinkWrapper to={`/books/${encodeURIComponent(book.bid)}`}>
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

MobileBookCard.propTypes = {
  book: PropTypes.shape({
    bid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
  }).isRequired,
};

export default MobileBookCard;
