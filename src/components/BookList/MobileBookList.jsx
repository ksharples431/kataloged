import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import MobileBookListCard from './MobileBookListCard.jsx';

const MobileBookList = ({ books, type }) => (
  <Box sx={{ width: '100%' }}>
    {books.map((book) => (
      <MobileBookListCard
        key={book.bid || book.ubid}
        book={book}
        type={type}
      />
    ))}
  </Box>
);

MobileBookList.propTypes = {
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

export default MobileBookList;
