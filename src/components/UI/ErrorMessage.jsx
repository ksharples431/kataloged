import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const ErrorMessage = ({ message }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh">
    <Typography color="error">Error: {message}</Typography>
  </Box>
);

export default ErrorMessage;

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
