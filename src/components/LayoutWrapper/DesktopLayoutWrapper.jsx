import PropTypes from 'prop-types';
import { Container, Grid, Box, useTheme } from '@mui/material';
import DesktopHeader from '../Header/DesktopHeader.jsx';
import Footer from '../UI/Footer.jsx';

const DesktopLayoutWrapper = ({ children }) => {
  const theme = useTheme();
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DesktopHeader />
        </Grid>
        <Grid item xs={12}>
          <Box
            component="main"
            p={2}
            bgcolor={theme.palette.background.default}
            minHeight="calc(100vh - 230px)">
            {children}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DesktopLayoutWrapper;

DesktopLayoutWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
