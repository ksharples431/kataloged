import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import DesktopAuthorListCard from './AuthorListCard';

const DesktopAuthorList = ({ authors }) => (
  <Grid container spacing={2}>
    {authors.map((author, index) => (
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        lg={2.4}
        key={`${author.author}-${index}`}>
        <DesktopAuthorListCard author={author} />
      </Grid>
    ))}
  </Grid>
);

DesktopAuthorList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      bookCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DesktopAuthorList;
