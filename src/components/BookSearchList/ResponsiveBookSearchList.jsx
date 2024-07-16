import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileBookSearchList from './MobileBookSearchList';
import DesktopBookSearchList from './DesktopBookSearchList';

const ResponsiveBookSearchList = ({ books }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <MobileBookSearchList books={books} />
  ) : (
    <DesktopBookSearchList books={books} />
  );
};

ResponsiveBookSearchList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      bid: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.string.isRequired,
      genre: PropTypes.string,
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default ResponsiveBookSearchList;
