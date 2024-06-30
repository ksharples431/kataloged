import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CardContent } from '@mui/material';
import {
  BookCardWrapper,
  BookImage,
  BookTitle,
  AuthorName,
} from './BookCard.styles';

const BookCard = ({ book }) => (

  <BookCardWrapper>
    <Link to={`/books/${encodeURIComponent(book.id)}`}>
      <BookImage
        component="img"
        image={book.imagePath || '/placeholder-book.jpg'}
        alt={book.title}
      />
    </Link>
    <CardContent sx={{ textAlign: 'center' }}>
      <Link to={`/books/${encodeURIComponent(book.id)}`}>
        <BookTitle variant="h6" component="h2">
          {book.title}
        </BookTitle>
      </Link>
      <Link to={`/authors/${encodeURIComponent(book.author)}`}>
        <AuthorName variant="body2" color="text.secondary">
          {book.author}
        </AuthorName>
      </Link>
    </CardContent>
  </BookCardWrapper>
);

export default BookCard;

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
  }).isRequired,
};
