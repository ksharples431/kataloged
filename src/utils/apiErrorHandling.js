export const handleApiError = (error) => {
  if (error.data && error.data.message) {
    // This is our custom error format
    return {
      message: error.data.message,
      statusCode: error.status,
      errorCode: error.data.errorCode,
    };
  } else if (error.status === 'FETCH_ERROR') {
    // Network error
    return {
      message:
        'Unable to connect to the server. Please check your internet connection.',
      statusCode: 'NETWORK_ERROR',
      errorCode: 'NETWORK_ERROR',
    };
  } else {
    // Fallback for unexpected errors
    return {
      message: 'An unexpected error occurred. Please try again later.',
      statusCode: 'UNKNOWN_ERROR',
      errorCode: 'UNKNOWN_ERROR',
    };
  }
};
