import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh">
    <CircularProgress />
    <Typography variant="h6" sx={{ marginTop: 2 }}>
      Searching the shelves...
    </Typography>
  </Box>
);

export default LoadingSpinner;
