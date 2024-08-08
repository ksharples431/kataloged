import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import {
  Favorite as FavoriteIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

import ButtonSuite from '../../../components/UI/ButtonSuite';
import {
  useAddUserBookMutation,
  useAddBookMutation,
} from '../../../store/api/apiSlice';


const SearchActions = ({ bid }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [book, setBook] = useState(null);
  const [addUserBook] = useAddUserBookMutation();
  const [addBook] = useAddBookMutation();

  const uid = useSelector((state) => state.auth.user?.uid);
  const searchResults = useSelector(
    (state) => state.search?.searchResults
  );

  useEffect(() => {
    if (searchResults && bid) {
      const foundBook = searchResults.find(
        (b) => b.bid === bid || b.id === bid
      );
      setBook(foundBook || null);
    }
  }, [searchResults, bid]);

  const handleAddBook = async () => {
    if (!book) {
      setError('Book details not found');
      return;
    }

    try {
      const addBookResult = await addBook(book).unwrap();
      console.log('Book added to database:', book.bid);
      const userBook = await addUserBook({
        bid: addBookResult.data.book.bid,
        uid,
        kataloged: false,
      }).unwrap();
      console.log('Book added to user library:', userBook.bid);
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

SearchActions.propTypes = {
  bid: PropTypes.string.isRequired,
};

export default SearchActions;
