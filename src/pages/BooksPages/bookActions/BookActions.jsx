import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Favorite as FavoriteIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

import ButtonSuite from '../../../components/UI/ButtonSuite';
import {
  useAddUserBookMutation,
  useDeleteBookMutation,
} from '../../../store/api/apiSlice';

const BookActions = ({
  bid,
  onBookAction,
  onDeleteStart,
  onUpdateStart,
}) => {
  const navigate = useNavigate();
  const uid = useSelector((state) => state.auth.user?.uid);

  const [addUserBook, { isLoading: isAddingBook }] =
    useAddUserBookMutation();
  const [deleteBook, { isLoading: isDeletingBook }] =
    useDeleteBookMutation();

  const handleUpdateClick = () => {
    onUpdateStart();
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

  return <ButtonSuite buttons={buttons} />;
};

BookActions.propTypes = {
  bid: PropTypes.string.isRequired,
  onBookAction: PropTypes.func.isRequired,
  onDeleteStart: PropTypes.func.isRequired,
  onUpdateStart: PropTypes.func.isRequired,
};

export default BookActions;
