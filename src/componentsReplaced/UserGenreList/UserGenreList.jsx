import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import UserGenreListCard from './UserGenreListCard';

const UserGenreList = ({ genres }) => (
  <Grid container spacing={2}>
    {genres.map((genre, index) => (
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        lg={2.4}
        key={`${genre.genre}-${index}`}>
        <UserGenreListCard genre={genre} />
      </Grid>
    ))}
  </Grid>
);

UserGenreList.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      genre: PropTypes.string.isRequired,
      bookCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default UserGenreList;
