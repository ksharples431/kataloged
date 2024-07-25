import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import ResponsiveCardCatalog from '../../components/CardCatalog/ResponsiveCardCatalog.jsx';

const HomePage = () => {
    const isAuthenticated = useSelector(
      (state) => state.auth.isAuthenticated
    );
  const allDrawers = [
    { label: 'Library', path: '/books' },
    { label: 'Authors', path: '/authors' },
    { label: 'Genres', path: '/genres' },
    // { label: 'Series', path: '/series' },
    { label: 'My Books', path: '/userBooks' },
    { label: 'My Authors', path: '/myAuthors' },
    { label: 'My Genres', path: '/myGenres' },
    // { label: 'My Series', path: '/userBooks' },
    // { label: 'My Queue', path: '/queue' },
    // { label: 'Favorites', path: '/favorites' },
    // { label: 'Account', path: '/account' },
    // { label: 'Stuff', path: '/stuff' },
  ];

  const guestDrawers = [
    { label: 'Books', path: '/books' },
    { label: 'Authors', path: '/authors' },
    { label: 'Genres', path: '/genres' },
    // { label: 'Series', path: '/series' },
    // { label: 'My Queue', path: '/queue' },
    // { label: 'Favorites', path: '/favorites' },
    // { label: 'Account', path: '/account' },
    // { label: 'Stuff', path: '/stuff' },
  ];

  const drawers = isAuthenticated ? allDrawers : guestDrawers;
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
      <ResponsiveCardCatalog drawers={drawers} />
    </Box>
  );
};

export default HomePage;
