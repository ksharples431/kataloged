import { useState } from 'react';
import { useDeleteBookMutation } from '../../../store/api/apiSlice';

export const useBookActions = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteStart = () => setIsDeleting(true);
  const handleUpdateStart = () => setIsUpdating(true);

  return {
    isDeleting,
    isUpdating,
    handleDeleteStart,
    handleUpdateStart,
    deleteBook,
  };
};
