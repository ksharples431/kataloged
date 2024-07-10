import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DesktopSignup from './DesktopSignup';
import MobileSignup from './MobileSignup';

const ResponsiveSignup = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? <MobileSignup /> : <DesktopSignup />;
};

export default ResponsiveSignup;
