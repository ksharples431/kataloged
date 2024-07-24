import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ButtonSuite from '../UI/ButtonSuite';
import {
  useAddUserBookMutation,
  useAddBookMutation,
} from '../../store/api/api.slice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SaveBookFromApiAction = ({ bid }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uid = useSelector((state) => state.auth.user?.uid);
  const book = useSelector((state) =>
    state.search.results.find((b) => b.bid === bid)
  );

  const [addUserBook] = useAddUserBookMutation();
  const [addBook] = useAddBookMutation();

  const handleAddBook = async () => {
    if (!book) {
      setError('Book details not found');
      return;
    }

    try {
      // First, add the book to the database
      const addedBook = await addBook(book).unwrap();
      console.log('Book added to database:', addedBook.book.bid);
      // Then, add the book to the user's library
      const userBook = await addUserBook({
        bid: addedBook.book.bid,
        uid,
      }).unwrap();
      console.log('Book added to user library:', userBook.ubid);

      setSuccess(true);
    } catch (err) {
      console.error('Failed to add book:', err);
      setError(err.data?.message || 'Failed to add book');
    }
  };

  const buttons = [
    {
      label: 'Add to my library',
      onClick: handleAddBook,
      icon: <FavoriteIcon />,
      color: 'secondary',
      disabled: !book,
    },
    {
      label: 'Back to search list',
      onClick: () => navigate('/search'),
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
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}>
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}>
          Book added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

SaveBookFromApiAction.propTypes = {
  bid: PropTypes.string.isRequired,
};

export default SaveBookFromApiAction;
