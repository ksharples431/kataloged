// ResponsiveBookList.jsx
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileBookList from './MobileBookList';
import DesktopBookList from './DesktopBookList';

const ResponsiveBookList = ({ books, type }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <MobileBookList books={books} type={type}/>
  ) : (
    <DesktopBookList books={books} type={type} />
  );
};

ResponsiveBookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      bid: PropTypes.string,
      ubid: PropTypes.string,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      imagePath: PropTypes.string,
      isbn: PropTypes.string,
      seriesName: PropTypes.string,
      seriesNumber: PropTypes.string,
    })
  ).isRequired,
  type: PropTypes.oneOf(['book', 'user', 'search']).isRequired,
};

export default ResponsiveBookList;
