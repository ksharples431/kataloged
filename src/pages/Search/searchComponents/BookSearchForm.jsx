import PropTypes from 'prop-types';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';

const BookSearchForm = ({
  searchCriteria,
  onInputChange,
  onDbSearch,
  onGoogleSearch,
}) => {
  const handleDbSearch = (event) => {
    event.preventDefault();
    onDbSearch(searchCriteria);
  };

  const handleGoogleSearch = (event) => {
    event.preventDefault();
    onGoogleSearch(searchCriteria);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography
            component="h2"
            color="primary"
            variant="h4"
            gutterBottom>
            Search for a Book
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={searchCriteria.title}
                  onChange={onInputChange}
                  InputProps={{
                    sx: { color: 'primary.main' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="author"
                  label="Author"
                  variant="outlined"
                  fullWidth
                  value={searchCriteria.author}
                  onChange={onInputChange}
                  InputProps={{
                    sx: { color: 'primary.main' },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="isbn"
                  label="ISBN"
                  variant="outlined"
                  fullWidth
                  value={searchCriteria.isbn}
                  onChange={onInputChange}
                  InputProps={{
                    sx: { color: 'primary.main' },
                  }}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <Button
                onClick={handleDbSearch}
                variant="contained"
                color="primary">
                Search Database
              </Button>
              <Button
                onClick={handleGoogleSearch}
                variant="contained"
                color="secondary">
                Search Google Books
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

BookSearchForm.propTypes = {
  searchCriteria: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    isbn: PropTypes.string.isRequired,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onDbSearch: PropTypes.func.isRequired,
  onGoogleSearch: PropTypes.func.isRequired,
};

export default BookSearchForm;
