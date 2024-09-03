import PropTypes from 'prop-types';
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  useTheme,
} from '@mui/material';

const LoadingSpinner = ({message}) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: theme.palette.background.default }}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <CircularProgress />
        </Grid>
        <Grid item>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.text.primary }}>
            {message || 'Searching the shelves...'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};

export default LoadingSpinner;
