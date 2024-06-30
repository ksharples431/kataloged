import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import BookCard from './BookCard';

const BookGrid = ({ books }) => (
  <Grid container spacing={2}>
    {books.map((book) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
        <BookCard book={book} />
      </Grid>
    ))}
  </Grid>
);

export default BookGrid;

BookGrid.propTypes = {
  books: PropTypes.array.isRequired,
};
