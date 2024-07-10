import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import MobileHeader from '../Header/MobileHeader.jsx';

const StyledMain = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingTop: theme.spacing(10), // Adjust this value based on your AppBar height
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(11),
  },
}));

const MobileLayoutWrapper = ({ children}) => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.background.default}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <MobileHeader  />
      <StyledMain>
        <Container maxWidth="lg">{children}</Container>
      </StyledMain>
      <Box
        component="footer"
        sx={{ mt: 'auto', py: 3, bgcolor: 'primary.main' }}>
        <Container
          maxWidth="lg"
          bgcolor={theme.palette.background.default}>
          <Typography variant="body2" color="text.primary" align="center">
            © {new Date().getFullYear()} KSharpCreations
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MobileLayoutWrapper;

MobileLayoutWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
