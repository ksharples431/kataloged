import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from './useSnackbar';

export const useBookActions = () => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleDeleteStart = () => setIsDeleting(true);
  const handleUpdateStart = () => setIsUpdating(true);

  const handleBookAction = (success, message, action) => {
    if (success && action === 'delete') {
      navigate('/books', {
        state: {
          snackbar: {
            open: true,
            message,
            severity: 'success',
          },
        },
      });
    } else {
      showSnackbar(message, success ? 'success' : 'error');
    }
    setIsDeleting(false);
    setIsUpdating(false);
  };

  return {
    isDeleting,
    isUpdating,
    handleDeleteStart,
    handleUpdateStart,
    handleBookAction,
  };
};
