// BookActions.jsx
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ButtonSuite from '../UI/ButtonSuite';
import {
  useAddUserBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} from '../../store/api/apiSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BookActions = ({ bid, book, onBookDeleted }) => {
  const navigate = useNavigate();
  const uid = useSelector((state) => state.auth.user?.uid);
  const [addUserBook, { isLoading: isAddingBook }] =
    useAddUserBookMutation();
  const [deleteBook, { isLoading: isDeletingBook }] =
    useDeleteBookMutation();
  const [updateBook, { isLoading: isUpdatingBook }] =
    useUpdateBookMutation();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updatedBookData, setUpdatedBookData] = useState(book);

  const handleAddBook = async () => {
    try {
      const userBook = await addUserBook({ bid, uid }).unwrap();
      console.log('Book added successfully:', userBook.userBook.ubid);
      onBookDeleted(true, 'Book added to your library successfully!');
    } catch (err) {
      console.error('Failed to add book:', err);
      onBookDeleted(false, err.data?.message || 'Failed to add book');
    }
  };

  const handleDeleteBook = async () => {
    try {
      await deleteBook(bid).unwrap();
      onBookDeleted(true, 'Book deleted successfully!');
    } catch (err) {
      console.error('Failed to delete book:', err);
      onBookDeleted(false, err.data?.message || 'Failed to delete book');
    }
  };

  const handleUpdateBook = async () => {
    try {
      const { name, secondaryText, ...dataToUpdate } = updatedBookData;
      await updateBook({ bid, ...dataToUpdate }).unwrap();
      onBookDeleted(true, 'Book updated successfully!');
      setIsUpdateDialogOpen(false);
    } catch (err) {
      console.error('Failed to update book:', err);
      onBookDeleted(false, err.data?.message || 'Failed to update book');
    }
  };

  const buttons = [
    {
      label: 'Add to my library',
      onClick: handleAddBook,
      icon: <FavoriteIcon />,
      color: 'secondary',
      disabled: isAddingBook,
    },
    {
      label: 'Update book',
      onClick: () => setIsUpdateDialogOpen(true),
      icon: <EditIcon />,
      color: 'primary',
      disabled: isUpdatingBook,
    },
    {
      label: 'Delete book',
      onClick: handleDeleteBook,
      icon: <DeleteIcon />,
      color: 'error',
      disabled: isDeletingBook,
    },
    {
      label: 'Back to book list',
      onClick: () => navigate('/books'),
      icon: <ArrowBackIcon />,
      color: 'primary',
    },
  ];

  return (
    <>
      <ButtonSuite buttons={buttons} />
      <Dialog
        open={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}>
        <DialogTitle
          sx={{ backgroundColor: 'white', color: 'main.darkSlateBlue' }}>
          Update Book
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: 'white' }}>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="standard"
            value={updatedBookData.title}
            onChange={(e) =>
              setUpdatedBookData({
                ...updatedBookData,
                title: e.target.value,
              })
            }
            InputProps={{ sx: { color: 'main.darkSlateBlue' } }}
          />
          <TextField
            margin="dense"
            label="Author"
            fullWidth
            variant="standard"
            value={updatedBookData.author}
            onChange={(e) =>
              setUpdatedBookData({
                ...updatedBookData,
                author: e.target.value,
              })
            }
            InputProps={{ sx: { color: 'main.darkSlateBlue' } }}
          />
        </DialogContent>
        <DialogActions
          sx={{ backgroundColor: 'white', color: 'main.darkSlateBlue' }}>
          <Button onClick={() => setIsUpdateDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdateBook}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

BookActions.propTypes = {
  bid: PropTypes.string.isRequired,
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  onBookDeleted: PropTypes.func.isRequired,
};

export default BookActions;
