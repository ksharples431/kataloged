import { useState } from 'react';
import { useDeleteBookMutation } from '../../../store/api/apiSlice';

export const useBookActions = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteStart = (value = true) => setIsDeleting(value);
  const handleUpdateStart = (value = true) => setIsUpdating(value);

  return {
    isDeleting,
    isUpdating,
    handleDeleteStart,
    handleUpdateStart,
    deleteBook,
  };
};