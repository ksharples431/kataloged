// DesktopBookList.jsx
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import DesktopUserBookCard from '../UserBookCard/DesktopUserBookCard';

const DesktopUserBookList = ({ userBooks }) => (
  <Grid container spacing={2}>
    {userBooks.map((userBook) => (
      <Grid item xs={12} sm={4} md={3} lg={2.4} key={userBook.ubid}>
        <DesktopUserBookCard userBook={userBook} />
      </Grid>
    ))}
  </Grid>
);

DesktopUserBookList.propTypes = {
  userBooks: PropTypes.arrayOf(
    PropTypes.shape({
      ubid: PropTypes.string.isRequired,
      title: PropTypes.string,
      author: PropTypes.string,
      imagePath: PropTypes.string,
    })
  ).isRequired,
};

export default DesktopUserBookList;
