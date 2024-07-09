// ResponsiveBookList.jsx
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileBookList from './MobileBookList';
import DesktopBookList from './DesktopBookList';

const ResponsiveBookList = ({ books }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <MobileBookList books={books} />
  ) : (
    <DesktopBookList books={books} />
  );
};

ResponsiveBookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      bid: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      imagePath: PropTypes.string,
    })
  ).isRequired,
};

export default ResponsiveBookList;
