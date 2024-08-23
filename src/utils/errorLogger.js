import { api } from '../store/api/apiSlice.js';

export const logError = async (error, errorInfo = {}) => {
  const errorData = {
    message: error.message,
    stack: error.stack,
    ...errorInfo,
    url: window.location.href,
    userAgent: navigator.userAgent,
  };

  try {
    // Use the API directly without hooks
    await api.endpoints.logFrontendError.initiate(errorData);
    console.log('Error logged successfully');
  } catch (loggingError) {
    console.error('Failed to log error:', loggingError);
  }
};
