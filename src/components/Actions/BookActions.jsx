/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  useTheme,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

import ButtonSuite from '../UI/ButtonSuite';
import {
  useAddUserBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} from '../../store/api/apiSlice';

const BookActions = ({
  bid,
  book,
  onBookAction,
  onDeleteStart,
  onUpdateStart,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const uid = useSelector((state) => state.auth.user?.uid);
  const [updatedBookData, setUpdatedBookData] = useState(book);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const [addUserBook, { isLoading: isAddingBook }] =
    useAddUserBookMutation();
  const [deleteBook, { isLoading: isDeletingBook }] =
    useDeleteBookMutation();
  const [updateBook, { isLoading: isUpdatingBook }] =
    useUpdateBookMutation();

  useEffect(() => {
    setUpdatedBookData(book);
  }, [book]);

  const handleUpdateClick = () => {
    navigate(`/books/${bid}/edit`);
  };

  const handleAddBook = async () => {
    try {
      await addUserBook({ bid, uid }).unwrap();
      onBookAction(
        true,
        'Book added to your library successfully!',
        'add'
      );
    } catch (err) {
      onBookAction(
        false,
        err.data?.message || 'Failed to add book',
        'add'
      );
    }
  };

  const handleDeleteBook = async () => {
    try {
      onDeleteStart();
      await deleteBook(bid).unwrap();
      onBookAction(true, 'Book deleted successfully!', 'delete');
    } catch (err) {
      onBookAction(
        false,
        err.data?.message || 'Failed to delete book',
        'delete'
      );
    }
  };

  const handleUpdateBook = async () => {
    try {
      onUpdateStart();
      const { name, secondaryText, ...dataToUpdate } = updatedBookData;
      const result = await updateBook({ bid, ...dataToUpdate }).unwrap();
      onBookAction(true, 'Book updated successfully!', 'update');
      setIsUpdateDialogOpen(false);
      setUpdatedBookData(result);
    } catch (err) {
      onBookAction(
        false,
        err.data?.message || 'Failed to update book',
        'update'
      );
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
      onClick: handleUpdateClick,
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
        <DialogTitle sx={{ color: theme.palette.main.slateBlue }}>
          Update Book
        </DialogTitle>
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
            InputProps={{
              style: { color: theme.palette.main.slateBlue },
            }}
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
            InputProps={{
              style: { color: theme.palette.main.slateBlue },
            }}
          />
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
  }).isRequired,
  onBookAction: PropTypes.func.isRequired,
  onDeleteStart: PropTypes.func.isRequired,
  onUpdateStart: PropTypes.func.isRequired,
};

export default BookActions;
