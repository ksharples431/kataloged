import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledMain = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingTop: theme.spacing(10), // Adjust this value based on your AppBar height
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(11),
  },
}));

const LayoutWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Kataloged
          </Typography>
        </Toolbar>
      </AppBar>
      <StyledMain>
        <Container maxWidth="lg">{children}</Container>
      </StyledMain>
      <Box
        component="footer"
        sx={{ mt: 'auto', py: 3, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            color="text.secondary"
            align="center">
            © {new Date().getFullYear()} KSharpCreations
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LayoutWrapper;
