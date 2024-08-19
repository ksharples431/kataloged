import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Box } from '@mui/material';
import GenreCard from './GenreCard';

const ListWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
}));

const GenreList = ({ genres, title }) => {
  return (
    <ListWrapper>
      {title && (
        <Title variant="h4" component="h1">
          {title}
        </Title>
      )}
      <Grid container spacing={3}>
        {genres.map((genre) => (
          <Grid item xs={12} sm={4} md={3} lg={2.4} key={genre.aid}>
            <GenreCard genre={genre} />
          </Grid>
        ))}
      </Grid>
    </ListWrapper>
  );
};

GenreList.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      gid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      bookCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
};

export default GenreList;
