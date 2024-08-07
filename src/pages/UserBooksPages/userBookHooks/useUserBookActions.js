import { useState } from 'react';
import { useDeleteUserBookMutation } from '../../../store/api/apiSlice';

export const useUserBookActions = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteUserBook] = useDeleteUserBookMutation();

  const handleDeleteStart = () => setIsDeleting(true);
  const handleUpdateStart = () => setIsUpdating(true);

  return {
    isDeleting,
    isUpdating,
    handleDeleteStart,
    handleUpdateStart,
    deleteUserBook,
  };
};

