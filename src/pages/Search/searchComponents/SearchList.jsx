import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Box } from '@mui/material';
import SearchCard from './SearchCard';

const ListWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
}));

const SearchList = ({ books, title }) => {
  return (
    <ListWrapper>
      {title && (
        <Title variant="h4" component="h1">
          {title}
        </Title>
      )}
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={4} md={3} lg={2.4} key={book.bid}>
            <SearchCard book={book} />
          </Grid>
        ))}
      </Grid>
    </ListWrapper>
  );
};

SearchList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      bid: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      imagePath: PropTypes.string,
    })
  ).isRequired,
  title: PropTypes.string,
};

export default SearchList;
