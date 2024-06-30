import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../store/books/booksThunks';
import LayoutWrapper from '../components/UI/LayoutWrapper';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  // Modal,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);
  const [selectedBook, setSelectedBook] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setDrawerOpen(true);
  };

  if (status === 'loading') {
    return (
      <LayoutWrapper>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh">
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
      minHeight="100vh">
        <Typography color="error">Error: {error}</Typography>
      </Box>
          </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>

    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Books
      </Typography>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => handleBookClick(book)}>
              <CardMedia
                component="img"
                height="200"
                image={book.imagePath || '/placeholder-book.jpg'}
                alt={book.title}
                sx={{ objectFit: 'cover' }}
                />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  noWrap>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}>
        {selectedBook && (
          <Box sx={{ width: 300, padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              {selectedBook.title}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Author"
                  secondary={selectedBook.author}
                  />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Genre"
                  secondary={selectedBook.genre}
                  />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Description"
                  secondary={selectedBook.description}
                  />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Last Updated"
                  secondary={new Date(
                    selectedBook.updatedAt
                  ).toLocaleDateString()}
                  />
              </ListItem>
            </List>
          </Box>
        )}
      </Drawer>
    </Box>
        </LayoutWrapper>
  );
};

export default BookList;
