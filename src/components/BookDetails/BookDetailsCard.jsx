import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileBookDetailsCard from './MobileBookDetailsCard';
import DesktopBookDetailsCard from './DesktopBookDetailsCard';

const BookDetailsCard = ({ book, type }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <MobileBookDetailsCard book={book} type={type} />
  ) : (
    <DesktopBookDetailsCard book={book} type={type} />
  );
};

BookDetailsCard.propTypes = {
  book: PropTypes.shape({
    bid: PropTypes.string,
    ubid: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    isbn: PropTypes.string,
    seriesName: PropTypes.string,
    seriesNumber: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['book', 'user', 'search']).isRequired,
};

export default BookDetailsCard;
