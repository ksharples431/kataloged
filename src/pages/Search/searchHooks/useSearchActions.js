import { useState } from 'react';
import {
  useAddUserBookMutation,
  useAddBookMutation,
} from '../../../store/api/apiSlice';

export const useSearchActions = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [addUserBook] = useAddUserBookMutation();
  const [addBook] = useAddBookMutation();

  const handleAddStart = (value = true) => setIsAdding(value);

  return {
    isAdding,
    handleAddStart,
    addUserBook,
    addBook,
  };
};
