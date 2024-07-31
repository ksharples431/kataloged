import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import ResponsiveCardCatalog from '../../components/Catalog/ResponsiveCardCatalog.jsx';

const HomePage = () => {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const username = useSelector((state) => state.auth.user?.username);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const textColor = theme.palette.main.mediumGray;

  const textStyle = {
    color: textColor,
    fontSize: isMobile ? '1.3rem' : '2.125rem', 
    marginBottom: isMobile ? '1rem' : '0.35em', 
  };

  const userDrawers = [
    { label: 'My Books', path: '/userBooks' },
    { label: 'My Authors', path: '/myAuthors' },
    { label: 'My Genres', path: '/myGenres' },
    { label: 'My Series', path: '/mySeries' },
  ];

  const katalogedDrawers = [
    { label: 'Library', path: '/books' },
    { label: 'Authors', path: '/authors' },
    { label: 'Genres', path: '/genres' },
    { label: 'Series', path: '/series' },
  ];

  const guestDrawers = [
    { label: 'Books', path: '/books' },
    { label: 'Authors', path: '/authors' },
    { label: 'Genres', path: '/genres' },
    { label: 'Series', path: '/series' },
  ];

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: isMobile ? 2 : 3,
        backgroundColor: '#1B263B',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      {!isAuthenticated ? (
        <ResponsiveCardCatalog drawers={guestDrawers} />
      ) : (
        <>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component="h1"
            gutterBottom
            sx={textStyle}>
            {username}&apos;s Library
          </Typography>
          <ResponsiveCardCatalog drawers={userDrawers} />
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component="h1"
            gutterBottom
            sx={[textStyle, { mt: isMobile ? 3 : 4 }]}>
            Kataloged Library
          </Typography>
          <ResponsiveCardCatalog drawers={katalogedDrawers} />
        </>
      )}
    </Box>
  );
};

export default HomePage;
