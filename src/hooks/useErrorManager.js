import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setError, clearError } from '../store/slices/errorSlice';
import { useLogFrontendErrorMutation } from '../store/api/apiSlice';

const useErrorManager = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const [logError] = useLogFrontendErrorMutation();

  const handleError = useCallback(
    async (errorData, shouldLog = true) => {
      const fullErrorData = {
        message: errorData.message,
        stack: errorData.stack,
        ...errorData,
        url: window.location.href,
        userAgent: navigator.userAgent,
      };

      if (shouldLog) {
        try {
          await logError(fullErrorData).unwrap();
          console.log('Error logged successfully');
        } catch (loggingError) {
          console.error('Failed to log error:', loggingError);
        }
      }

      dispatch(setError(fullErrorData));
    },
    [dispatch, logError]
  );

  const clearErrorState = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return { error, handleError, clearError: clearErrorState };
};

export default useErrorManager;
