import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileUserBookDetailsCard from './MobileUserBookDetailsCard';
import DesktopUserBookDetailsCard from './DesktopUserBookDetailsCard';

const ResponsiveUserBookDetailsCard = ({ userBook }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <MobileUserBookDetailsCard userBook={userBook} />
  ) : (
    <DesktopUserBookDetailsCard userBook={userBook} />
  );
};

ResponsiveUserBookDetailsCard.propTypes = {
  userBook: PropTypes.object.isRequired,
};

export default ResponsiveUserBookDetailsCard;
