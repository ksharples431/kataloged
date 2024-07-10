import PropTypes from 'prop-types';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import MobileHeader from '../Header/MobileHeader.jsx';

const StyledMain = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingTop: theme.spacing(10), // Adjust this value based on your AppBar height
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(11),
  },
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden', // Prevent content from overflowing
}));

const StyledContainer = styled(Container)(() => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'auto', // Allow scrolling if content is too large
}));

const ContentWrapper = styled('div')(() => ({
  width: '100%',
  maxHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transform: 'scale(1.05)', // Increase size by 5%
  transformOrigin: 'center center',
  '& > *': {
    // Target direct children
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const MobileLayoutWrapper = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      bgcolor={theme.palette.background.default}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <MobileHeader />
      <StyledMain>
        <StyledContainer maxWidth="lg">
          <ContentWrapper>{children}</ContentWrapper>
        </StyledContainer>
      </StyledMain>
      <Box component="footer" sx={{ py: 3, bgcolor: 'primary.main' }}>
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
