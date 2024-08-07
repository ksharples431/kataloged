import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Box } from '@mui/material';
import UserBookCard from './UserBookCard';

const ListWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
}));

const UserBookList = ({ userBooks, title }) => {
  return (
    <ListWrapper>
      {title && (
        <Title variant="h4" component="h1">
          {title}
        </Title>
      )}
      <Grid container spacing={3}>
        {userBooks.map((userBook) => (
          <Grid item xs={12} sm={4} md={3} lg={2.4} key={userBook.ubid}>
            <UserBookCard userBook={userBook} />
          </Grid>
        ))}
      </Grid>
    </ListWrapper>
  );
};

UserBookList.propTypes = {
  userBooks: PropTypes.arrayOf(
    PropTypes.shape({
      ubid: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      imagePath: PropTypes.string,
    })
  ).isRequired,
  title: PropTypes.string,
};

export default UserBookList;
