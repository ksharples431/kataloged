import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Box } from '@mui/material';
import UserGenreCard from './UserGenreCard';

const ListWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
}));

const UserGenreList = ({ userGenres, title }) => {
  return (
    <ListWrapper>
      {title && (
        <Title variant="h4" component="h1">
          {title}
        </Title>
      )}
      <Grid container spacing={3}>
        {userGenres.map((genre) => (
          <Grid item xs={12} sm={4} md={3} lg={2.4} key={genre.name}>
            <UserGenreCard genre={genre} />
          </Grid>
        ))}
      </Grid>
    </ListWrapper>
  );
};

UserGenreList.propTypes = {
  userGenres: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      bookCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
};

export default UserGenreList;
