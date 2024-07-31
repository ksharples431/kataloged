import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DesktopGenericList from './DesktopGenericList.jsx';
import MobileGenericList from './MobileGenericList.jsx';

const GenericList = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <MobileGenericList {...props} />
  ) : (
    <DesktopGenericList {...props} />
  );
};

GenericList.propTypes = {
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

export default GenericList;
