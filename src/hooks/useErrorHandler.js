import { useState, useCallback } from 'react';
import { useLogFrontendErrorMutation } from '../store/api/apiSlice';

const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const [logError] = useLogFrontendErrorMutation();

  const handleError = useCallback(
    async (error, errorInfo = {}) => {
      console.error('Error caught:', error);

      const errorData = {
        message: error.message,
        stack: error.stack,
        ...errorInfo,
        url: window.location.href,
        userAgent: navigator.userAgent,
      };

      try {
        await logError(errorData).unwrap();
        console.log('Error logged successfully');
      } catch (loggingError) {
        console.error('Failed to log error:', loggingError);
      }

      setError(errorData);
    },
    [logError]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};

export default useErrorHandler;
