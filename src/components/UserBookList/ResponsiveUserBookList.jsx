// ResponsiveBookList.jsx
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileUserBookList from './MobileUserBookList';
import DesktopUserBookList from './DesktopUserBookList';

const ResponsiveUserBookList = ({ userBooks }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <MobileUserBookList userBooks={userBooks} />
  ) : (
    <DesktopUserBookList userBooks={userBooks} />
  );
};

ResponsiveUserBookList.propTypes = {
  userBooks: PropTypes.arrayOf(
    PropTypes.shape({
      ubid: PropTypes.string.isRequired,
      title: PropTypes.string,
      author: PropTypes.string,
      imagePath: PropTypes.string,
    })
  ).isRequired,
};

export default ResponsiveUserBookList;
