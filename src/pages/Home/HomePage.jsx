import { Box, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import ResponsiveCardCatalog from '../../components/Catalog/ResponsiveCardCatalog.jsx';

const HomePage = () => {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const username = useSelector((state) => state.auth.user?.username);
    const theme = useTheme();
    const textColor = theme.palette.main.mediumGray;

    const textStyle = {
      color: textColor,
    };


  const userDrawers = [
    { label: 'My Books', path: '/userBooks' },
    { label: 'My Authors', path: '/myAuthors' },
    { label: 'My Genres', path: '/myGenres' },
    { label: 'My Series', path: '/mySeries' },
    // Add more user-specific drawers as needed
  ];

  const katalogedDrawers = [
    { label: 'Library', path: '/books' },
    { label: 'Authors', path: '/authors' },
    { label: 'Genres', path: '/genres' },
    { label: 'Series', path: '/series' },
    // Add more kataloged-specific drawers as needed
  ];

  const guestDrawers = [
    { label: 'Books', path: '/books' },
    { label: 'Authors', path: '/authors' },
    { label: 'Genres', path: '/genres' },
    { label: 'Series', path: '/series' },
    // Add more guest-specific drawers as needed
  ];

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: 3,
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
            variant="h4"
            component="h1"
            gutterBottom
            sx={textStyle}>
            {username}&apos;s Library
          </Typography>
          <ResponsiveCardCatalog drawers={userDrawers} />
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={[textStyle, { mt: 4 }]}>
            Kataloged Library
          </Typography>
          <ResponsiveCardCatalog drawers={katalogedDrawers} />
        </>
      )}
    </Box>
  );
};

export default HomePage;
