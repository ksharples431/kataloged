import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DesktopLogin from './DesktopLogin';
import MobileLogin from './MobileLogin';

const ResponsiveLogin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? <MobileLogin /> : <DesktopLogin />;
};

export default ResponsiveLogin;
