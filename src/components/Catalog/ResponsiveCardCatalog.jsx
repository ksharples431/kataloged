import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileCardCatalog from './MobileCardCatalog';
import DesktopCardCatalog from './DesktopCardCatalog';

const ResponsiveCardCatalog = ({ drawers }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <MobileCardCatalog drawers={drawers} />
  ) : (
    <DesktopCardCatalog drawers={drawers} />
  );
};

export default ResponsiveCardCatalog;

ResponsiveCardCatalog.propTypes = {
  drawers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};
