// MobileBookList.jsx
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import MobileUserBookCard from '../UserBookCard/MobileUserBookCard.jsx';

const MobileUserBookList = ({ userBooks }) => (
  <Box sx={{ width: '100%' }}>
    {userBooks.map((userBook) => (
      <MobileUserBookCard key={userBook.ubid} userBook={userBook} />
    ))}
  </Box>
);

MobileUserBookList.propTypes = {
  userBooks: PropTypes.arrayOf(
    PropTypes.shape({
      ubid: PropTypes.string.isRequired,
      title: PropTypes.string,
      author: PropTypes.string,
      imagePath: PropTypes.string,
    })
  ).isRequired,
};

export default MobileUserBookList;
