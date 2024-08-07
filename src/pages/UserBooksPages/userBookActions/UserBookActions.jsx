import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

import ButtonSuite from '../../../components/UI/ButtonSuite';
import { useDeleteUserBookMutation } from '../../../store/api/apiSlice';

const UserBookActions = ({
  ubid,
  onUserBookAction,
  onDeleteStart,
  onUpdateStart,
}) => {
  const navigate = useNavigate();

  const [deleteUserBook, { isLoading: isDeletingUserBook }] =
    useDeleteUserBookMutation();

  const handleUpdateClick = () => {
    onUpdateStart();
    navigate(`/userBooks/${ubid}/edit`);
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

  const buttons = [
    {
      label: 'Update user book',
      onClick: handleUpdateClick,
      icon: <EditIcon />,
      color: 'primary',
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

  return <ButtonSuite buttons={buttons} />;
};

UserBookActions.propTypes = {
  ubid: PropTypes.string.isRequired,
  onUserBookAction: PropTypes.func.isRequired,
  onDeleteStart: PropTypes.func.isRequired,
  onUpdateStart: PropTypes.func.isRequired,
};

export default UserBookActions;
