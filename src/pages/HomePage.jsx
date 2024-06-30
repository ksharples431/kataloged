import LayoutWrapper from '../components/UI/LayoutWrapper';
import { Box } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import {
  CardCatalog,
  Drawer,
  DrawerLabel,
  CircularButton,
} from './HomePage.styles';

const HomePage = () => {
  const theme = useMuiTheme();

  const drawers = [
    'All Books',
    'My Books',
    'Authors',
    'Genres',
    'Series',
    'My Queue',
    'Favorites',
    'Account',
  ];

  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
        <CardCatalog theme={theme}>
          {drawers.map((label, index) => (
            <Drawer key={index} theme={theme}>
              <DrawerLabel variant="body2" theme={theme}>
                {label}
              </DrawerLabel>
              <CircularButton size="large" theme={theme} />
            </Drawer>
          ))}
        </CardCatalog>
      </Box>
    </LayoutWrapper>
  );
};

export default HomePage;
