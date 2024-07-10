import { useState } from 'react';

import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';

const BookSearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearch = (event) => {
    event.preventDefault();

  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Ensure the container takes up the full height of the viewport
      }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mb: 4,
          maxWidth: '600px',
          width: '100%', // Ensure the card doesn't exceed the max width
          p: 2,
        }}>
        <CardContent>
          <Typography component="h2" variant="h4" gutterBottom>
            Search for a Book
          </Typography>
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}>
            <TextField
              label="Book Title"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookSearchForm;
