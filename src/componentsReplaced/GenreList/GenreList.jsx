import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import DesktopGenreListCard from './GenreListCard';

const DesktopGenreList = ({ genres }) => (
  <Grid container spacing={2}>
    {genres.map((genre, index) => (
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        lg={2.4}
        key={`${genre.genre}-${index}`}>
        <DesktopGenreListCard genre={genre} />
      </Grid>
    ))}
  </Grid>
);

DesktopGenreList.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      genre: PropTypes.string.isRequired,
      bookCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DesktopGenreList;
