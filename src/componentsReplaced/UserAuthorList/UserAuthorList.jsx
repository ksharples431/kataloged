import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import UserAuthorListCard from './UserAuthorListCard';

const UserAuthorList = ({ authors }) => (
  <Grid container spacing={2}>
    {authors.map((author, index) => (
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        lg={2.4}
        key={`${author.author}-${index}`}>
        <UserAuthorListCard author={author} />
      </Grid>
    ))}
  </Grid>
);

UserAuthorList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      bookCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default UserAuthorList;
