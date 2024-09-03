import { useSelector } from 'react-redux';
import { Alert, AlertTitle, Box } from '@mui/material';
import useErrorManager from '../../hooks/useErrorManager';

const ErrorDisplay = () => {
  const error = useSelector((state) => state.error);
  const { clearError } = useErrorManager();

  if (!error) return null;

  return (
    <Box sx={{ margin: 2 }}>
      <Alert severity="error" onClose={clearError}>
        <AlertTitle>Error</AlertTitle>
        {error.message}
        {error.statusCode && <p>Status Code: {error.statusCode}</p>}
        {error.errorCode && <p>Error Code: {error.errorCode}</p>}
      </Alert>
    </Box>
  );
};

export default ErrorDisplay;
