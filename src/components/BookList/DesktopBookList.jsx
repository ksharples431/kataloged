import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import DesktopBookListCard from './DesktopBookListCard';

const DesktopBookList = ({ books, type }) => (
  <Grid container spacing={2}>
    {books.map((book) => (
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        lg={2.4}
        key={book.bid || book.ubid}>
        <DesktopBookListCard
          book={book}
          type={type}
          key={book.bid || book.ubid}
        />
      </Grid>
    ))}
  </Grid>
);

DesktopBookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      bid: PropTypes.string,
      ubid: PropTypes.string,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      imagePath: PropTypes.string,
      isbn: PropTypes.string,
      seriesName: PropTypes.string,
      seriesNumber: PropTypes.string,
    })
  ).isRequired,
  type: PropTypes.oneOf(['book', 'user', 'search']).isRequired,
};


export default DesktopBookList;
