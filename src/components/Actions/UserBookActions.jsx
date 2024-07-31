import PropTypes from 'prop-types';
import { useState } from 'react';
import ButtonSuite from '../UI/ButtonSuite';
import {
  useUpdateUserBookMutation,
  useDeleteUserBookMutation,
} from '../../store/api/apiSlice';
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

const UserBookActions = ({ ubid, userBook, onUserBookDeleted }) => {
  const navigate = useNavigate();
  const [updateUserBook, { isLoading: isUpdatingUserBook }] =
    useUpdateUserBookMutation();
  const [deleteUserBook, { isLoading: isDeletingUserBook }] =
    useDeleteUserBookMutation();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updatedUserBookData, setUpdatedUserBookData] = useState(userBook);

  const handleUpdateUserBook = async () => {
    try {
      await updateUserBook({ ubid, ...updatedUserBookData }).unwrap();
      setSuccess('User book updated successfully!');
      setIsUpdateDialogOpen(false);
    } catch (err) {
      console.error('Failed to update user book:', err);
      setError(err.data?.message || 'Failed to update user book');
    }
  };

  const handleDeleteUserBook = async () => {
    try {
      let result = await deleteUserBook(ubid);
      const unwrappedResult = result.unwrap
        ? await result.unwrap()
        : result;
      setSuccess('User book deleted successfully!');
      onUserBookDeleted();
    } catch (err) {
      console.error('Failed to delete user book:', err);
      setError(err.data?.message || 'Failed to delete user book');
    }
  };

  const buttons = [
    {
      label: 'Update user book',
      onClick: () => setIsUpdateDialogOpen(true),
      icon: <EditIcon />,
      color: 'primary',
      disabled: isUpdatingUserBook,
    },
    {
      label: 'Remove from library',
      onClick: handleDeleteUserBook,
      icon: <DeleteIcon />,
      color: 'error',
      disabled: isDeletingUserBook,
    },
    {
      label: 'Back to my library',
      onClick: () => navigate('/userBooks'),
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
        <DialogTitle>Update User Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="standard"
            value={updatedUserBookData.title}
            onChange={(e) =>
              setUpdatedUserBookData({
                ...updatedUserBookData,
                title: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Author"
            fullWidth
            variant="standard"
            value={updatedUserBookData.author}
            onChange={(e) =>
              setUpdatedUserBookData({
                ...updatedUserBookData,
                author: e.target.value,
              })
            }
          />
          {/* Add more fields specific to user books as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsUpdateDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdateUserBook}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

UserBookActions.propTypes = {
  ubid: PropTypes.string.isRequired,
  userBook: PropTypes.shape({
    ubid: PropTypes.string.isRequired,
  }).isRequired,
  onUserBookDeleted: PropTypes.func.isRequired,
};

export default UserBookActions;
