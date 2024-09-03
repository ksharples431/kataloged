import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import LoadingSpinner from './LoadingSpinner';
import { useSnackbar } from '../../hooks/useSnackbar';

const GlobalUIWrapper = ({ children }) => {
  const { isLoading, loadingMessage } = useSelector((state) => state.ui);
  const { snackbar, handleSnackbarClose } = useSnackbar();

  return (
    <>
      {isLoading && <LoadingSpinner message={loadingMessage} />}
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

GlobalUIWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalUIWrapper;
