import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Box } from '@mui/material';
import DesktopGenericListCard from './DesktopGenericListCard';

const ListWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
}));

const DesktopGenericList = ({ items, type, title }) => {
  return (
    <ListWrapper>
      {title && (
        <Title variant="h4" component="h1">
          {title}
        </Title>
      )}
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={4} md={3} lg={2.4} key={item.id}>
            <DesktopGenericListCard item={item} type={type} />
          </Grid>
        ))}
      </Grid>
    </ListWrapper>
  );
};

DesktopGenericList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imagePath: PropTypes.string,
      secondaryText: PropTypes.string,
    })
  ).isRequired,
  type: PropTypes.oneOf([
    'book',
    'userBook',
    'author',
    'userAuthor',
    'genre',
    'userGenre',
  ]).isRequired,
  title: PropTypes.string,
};

export default DesktopGenericList;
