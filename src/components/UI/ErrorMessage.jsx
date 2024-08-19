import PropTypes from 'prop-types';
import { Box, Typography, useTheme } from '@mui/material';

const ErrorMessage = ({ message }) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: theme.palette.background.default }}>
      <Typography color="error">Error: {message}</Typography>
    </Box>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;

