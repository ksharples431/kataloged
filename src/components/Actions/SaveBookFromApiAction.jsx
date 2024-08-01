import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ButtonSuite from '../UI/ButtonSuite';
import {
  useAddUserBookMutation,
  useAddBookMutation,
} from '../../store/api/apiSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SaveBookFromApiAction = ({ bookId }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [book, setBook] = useState(null);
  const [addUserBook] = useAddUserBookMutation();
  const [addBook] = useAddBookMutation();

  const uid = useSelector((state) => state.auth.user?.uid);
  const originalResults = useSelector(
    (state) => state.search?.originalResults
  );

  useEffect(() => {
    if (originalResults && bookId) {
      const foundBook = originalResults.find(
        (b) => b.bid === bookId || b.id === bookId
      );
      setBook(foundBook || null);
    }
  }, [originalResults, bookId]);

  const handleAddBook = async () => {
    if (!book) {
      setError('Book details not found');
      return;
    }

    try {
      await addBook(book).unwrap();
      console.log('Book added to database:', book.bid);
      const userBook = await addUserBook({
        bid: book.bid,
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
  bookId: PropTypes.string.isRequired,
};

export default SaveBookFromApiAction;
