import PropTypes from 'prop-types';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const LiveSearchBar = ({ searchQuery, onInputChange }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography
            component="h2"
            color="primary"
            variant="h4"
            gutterBottom>
            Find a Book
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              name="query"
              label="Search by title or author"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={onInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { color: 'primary.main' },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

LiveSearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default LiveSearchBar;
