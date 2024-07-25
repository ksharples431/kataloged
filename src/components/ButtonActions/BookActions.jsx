import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ButtonSuite from '../UI/ButtonSuite';
import {
  useAddUserBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} from '../../store/api/api.slice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Snackbar,
  Alert,
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
  const [
    deleteBook,
    { isLoading: isDeletingBook, isSuccess: isDeleteSuccess },
  ] = useDeleteBookMutation();
  const [updateBook, { isLoading: isUpdatingBook }] =
    useUpdateBookMutation();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updatedBookData, setUpdatedBookData] = useState(book);

  useEffect(() => {
    if (isDeleteSuccess) {
      onBookDeleted();
    }
  }, [isDeleteSuccess, onBookDeleted]);

  const handleAddBook = async () => {
    try {
      const userBook = await addUserBook({ bid, uid }).unwrap();
      console.log('Book added successfully:', userBook.userBook.ubid);
      setSuccess('Book added to your library successfully!');
    } catch (err) {
      console.error('Failed to add book:', err);
      setError(err.data?.message || 'Failed to add book');
    }
  };

  const handleDeleteBook = async () => {
    try {
      await deleteBook(bid).unwrap();
      setSuccess('Book deleted successfully!');
    } catch (err) {
      console.error('Failed to delete book:', err);
      setError(err.data?.message || 'Failed to delete book');
    }
  };

  const handleUpdateBook = async () => {
    try {
      await updateBook({ bid, ...updatedBookData }).unwrap();
      setSuccess('Book updated successfully!');
      setIsUpdateDialogOpen(false);
    } catch (err) {
      console.error('Failed to update book:', err);
      setError(err.data?.message || 'Failed to update book');
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
      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={() => setError(null)}>
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={success !== false}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}>
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
      <Dialog
        open={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}>
        <DialogTitle>Update Book</DialogTitle>
        <DialogContent>
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
          />
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
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
    // Add more prop types as needed
  }).isRequired,
  onBookDeleted: PropTypes.func.isRequired,
};

export default BookActions;
