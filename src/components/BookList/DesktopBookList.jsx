// DesktopBookList.jsx
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import DesktopBookCard from '../BookCard/DesktopBookCard';

const DesktopBookList = ({ books }) => (
  <Grid container spacing={2}>
    {books.map((book) => (
      <Grid item xs={12} sm={4} md={3} lg={2.4} key={book.bid}>
        <DesktopBookCard book={book} />
      </Grid>
    ))}
  </Grid>
);

DesktopBookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      bid: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      imagePath: PropTypes.string,
    })
  ).isRequired,
};

export default DesktopBookList;
