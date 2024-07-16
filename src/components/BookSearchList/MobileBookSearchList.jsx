import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import MobileBookCard from '../BookCard/MobileBookCard';

const MobileBookSearchList = ({ books }) => (
  <Box sx={{ width: '100%' }}>
    {books.map((book) => (
      <MobileBookCard key={book.bid} book={book} />
    ))}
  </Box>
);

MobileBookSearchList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      bid: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      imagePath: PropTypes.string,
    })
  ).isRequired,
};

export default MobileBookSearchList;
