import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Box } from '@mui/material';
import UserAuthorCard from './UserAuthorCard';

const ListWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
}));

const UserAuthorList = ({ userAuthors, title }) => {
  return (
    <ListWrapper>
      {title && (
        <Title variant="h4" component="h1">
          {title}
        </Title>
      )}
      <Grid container spacing={3}>
        {userAuthors.map((author) => (
          <Grid item xs={12} sm={4} md={3} lg={2.4} key={author.name}>
            <UserAuthorCard author={author} />
          </Grid>
        ))}
      </Grid>
    </ListWrapper>
  );
};

UserAuthorList.propTypes = {
  userAuthors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      bookCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
};

export default UserAuthorList;
