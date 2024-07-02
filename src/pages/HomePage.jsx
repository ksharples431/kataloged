import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';
import { fetchBooks } from '../store/books/booksThunks';
import {
  CardCatalog,
  Drawer,
  DrawerLabel,
  CircularButton,
} from './HomePage.styles.jsx';

const HomePage = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.books);
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
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <ErrorMessage message={error} />;
  }

  return (
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
  );
};

export default HomePage;
