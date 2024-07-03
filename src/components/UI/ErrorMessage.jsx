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
      <Typography sx={{ color: theme.palette.text.primary }}>
        Error: {message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
