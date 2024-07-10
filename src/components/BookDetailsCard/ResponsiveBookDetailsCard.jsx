import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileBookDetailsCard from './MobileBookDetailsCard';
import DesktopBookDetailsCard from './DesktopBookDetailsCard';

const ResponsiveBookDetailsCard = ({ book }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <MobileBookDetailsCard book={book} />
  ) : (
    <DesktopBookDetailsCard book={book} />
  );
};

ResponsiveBookDetailsCard.propTypes = {
  book: PropTypes.object.isRequired,
};

export default ResponsiveBookDetailsCard;
