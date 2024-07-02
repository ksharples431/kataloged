import PropTypes from 'prop-types';
import { Container, Grid, Box } from '@mui/material';
import Header from './Header'; 

const LayoutWrapper = ({ children }) => {
  return (
    <Container>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Header />
        </Grid>

        {/* Main content */}
        <Grid item xs={12}>
          <Box sx={{ bgcolor: 'background.default', p: 8 }}>{children}</Box>
        </Grid>

        {/* Footer */}
        <Grid item xs={12}>
          <Box sx={{ bgcolor: 'primary.main', p: 3, color: 'white' }}>
            © 2024 KSharpCreations
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LayoutWrapper;

LayoutWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
