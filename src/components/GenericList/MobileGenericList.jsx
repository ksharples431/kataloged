import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { List, ListItem, Typography, Box } from '@mui/material';
import MobileGenericListCard from './MobileGenericListCard';

const ListWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
}));

const MobileGenericList = ({ items, type, title }) => {
  return (
    <ListWrapper>
      {title && (
        <Title variant="h5" component="h1">
          {title}
        </Title>
      )}
      <List disablePadding>
        {items.map((item) => (
          <StyledListItem key={item.id} disableGutters>
            <MobileGenericListCard item={item} type={type} />
          </StyledListItem>
        ))}
      </List>
    </ListWrapper>
  );
};

MobileGenericList.propTypes = {
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

export default MobileGenericList;
