import { useState } from 'react';

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const hideSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    hideSnackbar();
  };

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
    handleSnackbarClose,
  };
};
