import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../store/books/booksThunks';
import LayoutWrapper from '../components/UI/LayoutWrapper';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import {
  CardCatalog,
  Drawer,
  DrawerLabel,
  CircularButton,
} from './HomePage.styles';

const HomePage = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);
  const theme = useMuiTheme();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  const drawers = [
    { label: 'All Books', path: '/books' },
    { label: 'My Books', path: '/my-books' },
    { label: 'Authors', path: '/authors' },
    { label: 'Genres', path: '/genres' },
    { label: 'Series', path: '/series' },
    { label: 'My Queue', path: '/queue' },
    { label: 'Favorites', path: '/favorites' },
    { label: 'Account', path: '/account' },
  ];

  if (status === 'loading') {
    return (
      <LayoutWrapper>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh">
          <CircularProgress />
        </Box>
      </LayoutWrapper>
    );
  }

  if (status === 'failed') {
    return (
      <LayoutWrapper>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh">
          <Typography color="error">Error: {error}</Typography>
        </Box>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
        <CardCatalog theme={theme}>
          {drawers.map(({ label, path }, index) => (
            <Link
              key={index}
              to={path}
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <Drawer theme={theme}>
                <DrawerLabel variant="body2" theme={theme}>
                  {label}
                </DrawerLabel>
                <CircularButton size="large" theme={theme} />
              </Drawer>
            </Link>
          ))}
        </CardCatalog>
      </Box>
    </LayoutWrapper>
  );
};

export default HomePage;
