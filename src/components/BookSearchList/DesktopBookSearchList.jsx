import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import DesktopBookSearchCard from './DesktopBookSearchCard';

const DesktopBookSearchList = ({ books }) => {
  if (!Array.isArray(books)) {
    console.error('Books prop is not an array:', books);
    return null; // or return some placeholder content
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      {books.map((book) => (
        <Grid item key={book.bid}>
          <DesktopBookSearchCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

DesktopBookSearchList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      bid: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.string.isRequired,
      genre: PropTypes.string,
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default DesktopBookSearchList;
