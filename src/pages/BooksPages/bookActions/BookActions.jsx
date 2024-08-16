import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { pathname } = location
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
      navigate('/books', {
        state: {
          snackbar: {
            message: 'Book deleted successfully!',
            severity: 'success',
          },
        },
      });
    } catch (err) {
      onBookAction(
        false,
        err.data?.message || 'Failed to delete book',
        'delete'
      );
    }
  };

  const handleBackClick = () => {
    const pathSegments = pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 2];

    if (lastSegment === 'books') {
      navigate(-1); 
    } else {
      navigate('/books'); 
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
      onClick: handleBackClick,
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
