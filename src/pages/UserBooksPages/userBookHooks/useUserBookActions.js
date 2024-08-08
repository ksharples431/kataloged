import { useState } from 'react';
import { useDeleteUserBookMutation } from '../../../store/api/apiSlice';

export const useUserBookActions = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteUserBook] = useDeleteUserBookMutation();

  const handleDeleteStart = (value = true) => setIsDeleting(value);
  const handleUpdateStart = (value = true) => setIsUpdating(value);

  return {
    isDeleting,
    isUpdating,
    handleDeleteStart,
    handleUpdateStart,
    deleteUserBook,
  };
};

