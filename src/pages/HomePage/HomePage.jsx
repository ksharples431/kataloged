import { Box } from '@mui/material';

import ResponsiveCardCatalog from '../../components/CardCatalog/ResponsiveCardCatalog.jsx';

const HomePage = () => {
  const drawers = [
    { label: 'All Books', path: '/books' },
    { label: 'My Books', path: '/userBooks' },
    { label: 'Authors', path: '/authors' },
    { label: 'Genres', path: '/genres' },
    { label: 'Series', path: '/series' },
    { label: 'My Queue', path: '/queue' },
    { label: 'Favorites', path: '/favorites' },
    { label: 'Account', path: '/account' },
    { label: 'Stuff', path: '/stuff' },
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
      <ResponsiveCardCatalog drawers={drawers} />
    </Box>
  );
};

export default HomePage;
