import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DesktopLayoutWrapper from './DesktopLayoutWrapper.jsx';
import MobileLayoutWrapper from './MobileLayoutWrapper.jsx';

const ResponsiveLayoutWrapper = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <MobileLayoutWrapper>{children}</MobileLayoutWrapper>
  ) : (
    <DesktopLayoutWrapper>{children}</DesktopLayoutWrapper>
  );
};

export default ResponsiveLayoutWrapper;

ResponsiveLayoutWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
