import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  useTheme,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

import ButtonSuite from '../UI/ButtonSuite';
import {
  useUpdateUserBookMutation,
  useDeleteUserBookMutation,
} from '../../store/api/apiSlice';

const UserBookActions = ({
  ubid,
  userBook,
  onUserBookAction,
  onDeleteStart,
  onUpdateStart,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [updatedUserBookData, setUpdatedUserBookData] = useState(userBook);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const [updateUserBook, { isLoading: isUpdatingUserBook }] =
    useUpdateUserBookMutation();
  const [deleteUserBook, { isLoading: isDeletingUserBook }] =
    useDeleteUserBookMutation();

  const handleDialogClose = () => {
    setIsUpdateDialogOpen(false);
  };

  const handleInputChange = (field) => (event) => {
    setUpdatedUserBookData({
      ...updatedUserBookData,
      [field]: event.target.value,
    });
  };

  const handleUpdateClick = () => {
    setIsUpdateDialogOpen(true);
  };

  const handleDeleteUserBook = async () => {
    try {
      onDeleteStart();
      await deleteUserBook(ubid).unwrap();
      onUserBookAction(
        true,
        'User book removed from library successfully!',
        'delete'
      );
    } catch (err) {
      onUserBookAction(
        false,
        err.data?.message || 'Failed to remove user book',
        'delete'
      );
    }
  };

  const handleUpdateUserBook = async () => {
    try {
      onUpdateStart();
      const result = await updateUserBook({
        ubid,
        ...updatedUserBookData,
      }).unwrap();
      onUserBookAction(true, 'User book updated successfully!', 'update');
      setIsUpdateDialogOpen(false);
      setUpdatedUserBookData(result);
    } catch (err) {
      onUserBookAction(
        false,
        err.data?.message || 'Failed to update user book',
        'update'
      );
    }
  };

  const buttons = [
    {
      label: 'Update user book',
      onClick: handleUpdateClick,
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
      onClick: () => navigate('/my-books'),
      icon: <ArrowBackIcon />,
      color: 'primary',
    },
  ];

  return (
    <>
      <ButtonSuite buttons={buttons} />
      <Dialog open={isUpdateDialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ color: theme.palette.main.slateBlue }}>
          Update User Book
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="standard"
            value={updatedUserBookData.title}
            onChange={handleInputChange('title')}
            InputProps={{ style: { color: theme.palette.main.slateBlue } }}
          />
          <TextField
            margin="dense"
            label="Author"
            fullWidth
            variant="standard"
            value={updatedUserBookData.author}
            onChange={handleInputChange('author')}
            InputProps={{ style: { color: theme.palette.main.slateBlue } }}
          />
          {/* Add more fields specific to user books as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleUpdateUserBook}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

UserBookActions.propTypes = {
  ubid: PropTypes.string.isRequired,
  userBook: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  onUserBookAction: PropTypes.func.isRequired,
  onDeleteStart: PropTypes.func.isRequired,
  onUpdateStart: PropTypes.func.isRequired,
};

export default UserBookActions;
