import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import { fetchBooks } from '../../store/books/booksThunks';
import CardCatalog from './CardCatalog';

const HomePage = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.books);
  // const theme = useTheme();

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
    { label: 'Stuff', path: '/stuff' },
  ];

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <ErrorMessage message={error} />;
  }

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: 3,
        backgroundColor: '#1B263B',
        // backgroundImage: theme.customBackgrounds?.wood,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <CardCatalog drawers={drawers} />
    </Box>
  );
};

export default HomePage;
